import {CurrentWorkflowState, Resolvers, SubscriptionWorkflowStateArgs} from '../gql/index.js'
import {Client} from '@temporalio/client'
import {GraphQLResolveInfo} from 'graphql'

function delay(t: any) {
    return new Promise(resolve => setTimeout(resolve, t))
}


async function* interval(t: any) {
    while (true) {
        let now = Date.now()
        yield now + ''
        await delay(now - Date.now() + t)
    }
}

export const createResolvers = (client: Client): Resolvers => {
    const res: Resolvers = {
        Subscription: {
            workflowState: {
                resolve(payload: CurrentWorkflowState): Promise<Promise<CurrentWorkflowState> | CurrentWorkflowState> | Promise<CurrentWorkflowState> | CurrentWorkflowState {
                    return payload
                },
                subscribe: subWithClient(client)
            }
        },

    }
    return res
}

const subWithClient = (client: Client) => {
    return async function* (parent: {}, args: Omit<SubscriptionWorkflowStateArgs, "input"> & {
        input: NonNullable<SubscriptionWorkflowStateArgs["input"]>
    }, context: any, info: GraphQLResolveInfo) {
        console.log('subWithClient', args.input.workflowId)

        for await (const time of interval(1000)) {
            let wf = client.workflow.getHandle(args.input?.workflowId || 'notfound')
            console.log('querying state')
            yield await wf.query('currentState')
        }
    }
}