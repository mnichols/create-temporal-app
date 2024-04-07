import {
    FinalizeResponse,
    MutationExecuteWorkflowArgs,
    MutationFinalizeRequestArgs,
    QueryQueryWorkflowArgs,
    QueryResponse,
    ReplyResponse,
    Resolvers
} from '../gql/index.js'

export const resolvers: Resolvers = {
    Mutation: {
        executeWorkflow: async (_, args: Required<MutationExecuteWorkflowArgs>): Promise<ReplyResponse> => {
            return {value: args.input.value}
        },
        finalizeRequest: async (_, args: Required<MutationFinalizeRequestArgs>): Promise<FinalizeResponse> => {
            return {value: args.input.value}
        }
    },
    Query: {
        queryWorkflow: async (_, args: QueryQueryWorkflowArgs): Promise<QueryResponse> => {
            return {value: args.input?.value || 'no value'}
        }
    }
}
