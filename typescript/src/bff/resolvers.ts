import {ExecuteWorkflowRequest, ReplyResponse, Resolvers} from '../gql/index.js'

export const resolvers: Resolvers = {
    Mutation: {
        executeWorkflow: (args: ExecuteWorkflowRequest): ReplyResponse => {
            console.log('args', args)
            return {value: args.value || 'why is this null'}
        }
        // executeWorkflow: (input: ExecuteWorkflowRequest): ReplyResponse => {
        //     const value: String = input.value
        //     console.log('mutation:executeWorkflow', input)
        //     if (!input.value) {
        //         console.log('WTF')
        //     }
        //     return {value: input.value}
        // }

    },
    Query: {
        replyResponse: () => {
            return {value: "foo"}
        }

    }

    // ReplyResponse: (),
}
