import type * as activities from './activities.js'
import {CaptureRequest, CurrentPaymentState, QueryQueryWorkflowArgs} from '../../gql/index.js'
import {
    ApplicationFailure,
    condition,
    defineQuery,
    defineSignal,
    proxyActivities,
    setHandler,
    workflowInfo
} from '@temporalio/workflow'


const {
    capture,
    begin,
    finalize,
    compensate,
} = proxyActivities<typeof activities>({
    startToCloseTimeout: '10 seconds',
})

const signalMarkFinalizable = 'capture'
const queryCurrentWorkflowState = 'currentState'
const currentWorkflowStateQueryDef =
    defineQuery<CurrentPaymentState, [QueryQueryWorkflowArgs]>(queryCurrentWorkflowState)

const markFinalizableSignalDef = defineSignal<[CaptureRequest]>(signalMarkFinalizable)

export async function completePayment(params: CurrentPaymentState): Promise<CurrentPaymentState> {
    const currentState: CurrentPaymentState = params
    let captureRequested: CaptureRequest | undefined

    setHandler(currentWorkflowStateQueryDef, (params: QueryQueryWorkflowArgs) => currentState)
    setHandler(markFinalizableSignalDef, (signalValue: CaptureRequest) => {
        captureRequested = signalValue
    })
    if (!params.authorization?.approved) {
        // here we could journal declined payments and track for fraud detection, audits, etc
        throw ApplicationFailure.create({
            message: "Only approved payments may be completed."
        })
    }

    const conditionMet = await condition(() => !!captureRequested, 1000 * 180)

    if (!conditionMet) {
        // payment was never captured so release the authorization
        return currentState
    }

    if (captureRequested) {
        try {
            currentState.capture = await capture(captureRequested)
        } catch (err) {
            currentState.compensation = await compensate(params)
            throw err
        }
    }


    currentState.beginning = await begin(params)

    currentState.finalization = await finalize({
        workflowId: workflowInfo().workflowId,
        value: currentState.capture?.value || 'unknown'
    })
    return currentState
}