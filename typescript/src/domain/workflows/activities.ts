import {
    AuthorizePaymentRequest,
    BeginRequest,
    BeginResponse,
    CompensateRequest,
    CompensateResponse,
    FinalizeRequest,
    FinalizeResponse,
    MutateApplicationRequest,
    MutateApplicationResponse,
    PaymentAuthorizationResponse,
    QueryRequest,
    QueryResponse,
    ValidateRequest,
    ValidateResponse
} from '../../gql/index.js'
import {Context} from '@temporalio/activity'

export async function validate(params: ValidateRequest): Promise<ValidateResponse> {
    return {value: params.value}
}

export async function authorizePayment(params: AuthorizePaymentRequest): Promise<string> {
    return `${params.value}__${params.paymentId}`
}

export async function getAuthorization(token: string): Promise<PaymentAuthorizationResponse> {
    const parts = token.split('__')
    return {
        token,
        approved: !token.includes('declined'),
        value: parts[0]
    }
}

export async function mutateApplication(params: MutateApplicationRequest): Promise<MutateApplicationResponse> {
    return {value: params.value}
}

export async function compensate(params: CompensateRequest): Promise<CompensateResponse> {
    return {value: params.value}
}

export async function query(params: QueryRequest): Promise<QueryResponse> {
    return {value: params.value || 'no value specified'}
}

export async function begin(params: BeginRequest): Promise<BeginResponse> {
    return {value: params.value}
}

export async function finalize(params: FinalizeRequest): Promise<FinalizeResponse> {
    return {value: params.value, workflowId: Context.current().info.workflowExecution?.workflowId}
}
