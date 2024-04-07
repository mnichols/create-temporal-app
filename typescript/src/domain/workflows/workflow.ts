import type * as activities from './activities.js'
import {compensate} from './activities.js'
import {ExecuteWorkflowRequest, ExecuteWorkflowState, QueryQueryWorkflowArgs} from '../../gql/index.js'
import {defineQuery, proxyActivities, setHandler} from '@temporalio/workflow'

const {
    validate,
    mutateApplication
} = proxyActivities<typeof activities>({
    startToCloseTimeout: '10 seconds',
})

export const queryExecuteWorkflowState =
    defineQuery<ExecuteWorkflowState, [QueryQueryWorkflowArgs]>('queryWorkflow')

export async function executeWorkflow(params: ExecuteWorkflowRequest): Promise<void> {
    const currentState: ExecuteWorkflowState = {
        value: params.value,
        validation: undefined,
        applicationMutation1: undefined,
        applicationMutation2: undefined,
        compensation: undefined,
        beginning: undefined,
        finalization: undefined,
    }

    setHandler(queryExecuteWorkflowState, (params: QueryQueryWorkflowArgs) => currentState)

    try {
        currentState.validation = await validate(params)
        currentState.applicationMutation1 = await mutateApplication(params)
        currentState.applicationMutation2 = await mutateApplication(params)
    } catch (err) {
        currentState.compensation = await compensate(params)
        throw err
    }

}