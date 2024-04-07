import {MutationExecuteWorkflowArgs, ReplyResponse, Resolvers} from '../gql/index.js'

export const resolvers: Resolvers = {
    Mutation: {
        executeWorkflow: (_, args: Required<MutationExecuteWorkflowArgs>): ReplyResponse => {
            return {value: args.input.value}
        }
    },
    Query: {
        replyResponse: () => {
            return {value: "foo"}
        }

    }

    // ReplyResponse: (),
}
