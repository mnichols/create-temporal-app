import {
    BeginRequest,
    CompensateRequest,
    CompensateResponse,
    MutateApplicationRequest,
    MutateApplicationResponse,
    QueryRequest,
    QueryResponse,
    ValidateRequest,
    ValidateResponse
} from '../../gql/index.js'

export async function validate(params: ValidateRequest): Promise<ValidateResponse> {
    return {value: params.value}
}

export async function mutateApplication(params: MutateApplicationRequest): Promise<MutateApplicationResponse> {
    return {value: params.value}
}

export async function compensate(params: CompensateRequest): Promise<CompensateResponse> {
    return {value: params.value}
}

export async function query(params: QueryRequest): Promise<QueryResponse> {
    return {value: params.value}
}

export async function begin(params: BeginRequest): Promise<BeginRequest> {
    return {value: params.value}
}

