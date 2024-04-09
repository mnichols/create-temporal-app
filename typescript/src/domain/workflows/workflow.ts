import type * as activities from './activities.js'
import {compensate} from './activities.js'
import {ExecuteWorkflowRequest, ExecuteWorkflowState, MarkFinalizable, QueryQueryWorkflowArgs} from '../../gql/index.js'
import {condition, defineQuery, defineSignal, proxyActivities, setHandler} from '@temporalio/workflow'


const {
    validate,
    mutateApplication,
    begin,
    finalize,
} = proxyActivities<typeof activities>({
    startToCloseTimeout: '10 seconds',
})

const signalMarkFinalizable = 'markFinalizable'
const queryCurrentWorkflowState = 'currentState'
const currentWorkflowStateQueryDef =
    defineQuery<ExecuteWorkflowState, [QueryQueryWorkflowArgs]>(queryCurrentWorkflowState)

const markFinalizableSignalDef = defineSignal<[MarkFinalizable]>(signalMarkFinalizable)

export async function executeWorkflow(params: ExecuteWorkflowRequest): Promise<ExecuteWorkflowState> {
    const currentState: ExecuteWorkflowState = {
        value: params.value,
        validation: undefined,
        applicationMutation1: undefined,
        applicationMutation2: undefined,
        compensation: undefined,
        beginning: undefined,
        finalization: undefined,
        finalizable: undefined,
    }

    setHandler(currentWorkflowStateQueryDef, (params: QueryQueryWorkflowArgs) => currentState)
    setHandler(markFinalizableSignalDef, (signalValue: MarkFinalizable) => {
        currentState.finalizable = signalValue
    })
    try {
        currentState.validation = await validate(params)
        currentState.applicationMutation1 = await mutateApplication(params)
        currentState.applicationMutation2 = await mutateApplication(params)
    } catch (err) {
        currentState.compensation = await compensate(params)
        throw err
    }

    if (params.reply) {
        const reply = proxyActivities({
            taskQueue: params.reply.taskQueue,
            startToCloseTimeout: '10 seconds',
        })

        currentState.reply = await reply[params.reply.activityName](params.reply)
    }
    currentState.beginning = await begin(params)
    await condition(() => !!currentState.finalizable?.value, 1000 * 60)
    currentState.finalization = await finalize(params)
    return currentState
}