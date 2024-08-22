import type * as activities from './activities.js'
import {
    AuthorizePaymentRequest,
    AuthorizePaymentResponse,
    CurrentPaymentState,
    MarkFinalizableRequest,
    QueryQueryWorkflowArgs
} from '../../gql/index.js'
import {defineQuery, defineSignal, proxyActivities, setHandler, workflowInfo} from '@temporalio/workflow'
import {ERR_ISSUER_SERVICE_FAILURE} from './errors.js'


const {
    authorizePayment: doAuthorizePayment,
    getAuthorization,
    compensate,
} = proxyActivities<typeof activities>({
    startToCloseTimeout: '10 seconds',
    retry: {
        nonRetryableErrorTypes: [ERR_ISSUER_SERVICE_FAILURE]
    }
})

const signalMarkFinalizable = 'markFinalizable'
const queryCurrentWorkflowState = 'currentState'
const currentWorkflowStateQueryDef =
    defineQuery<CurrentPaymentState, [QueryQueryWorkflowArgs]>(queryCurrentWorkflowState)

const markFinalizableSignalDef = defineSignal<[MarkFinalizableRequest]>(signalMarkFinalizable)

export async function authorizePayment(params: AuthorizePaymentRequest): Promise<AuthorizePaymentResponse> {
    const currentState: CurrentPaymentState = {
        accountId: params.accountId,
        value: params.value,
        authorizationToken: undefined,
        applicationMutation1: undefined,
        applicationMutation2: undefined,
        compensation: undefined,
        beginning: undefined,
        finalization: undefined,
        finalizable: undefined,
        paymentId: workflowInfo().workflowId,
        paymentCompletionId: `comp_${params.paymentId}`,
    }

    setHandler(currentWorkflowStateQueryDef, (params: QueryQueryWorkflowArgs) => currentState)

    try {
        currentState.authorizationToken = await doAuthorizePayment(params)
        currentState.authorization = await getAuthorization(currentState.authorizationToken)
    } catch (err) {
        currentState.compensation = await compensate(params)
        throw err
    }

    return {
        token: currentState.authorizationToken,
        value: currentState.value,
        paymentId: currentState.paymentId,
        approved: currentState.authorization?.approved
    }
}