import {ExecuteWorkflowRequest, ReplyResponse, Resolvers} from '../gql/index.js'

export const resolvers: Resolvers = {
    Mutation: {
        executeWorkflow: (input: ExecuteWorkflowRequest): ReplyResponse => {
            const val = JSON.parse(JSON.stringify(input))
            return {value: val.value}
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
