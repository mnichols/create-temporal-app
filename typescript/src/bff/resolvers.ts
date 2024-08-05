import {
    AppInfo,
    CurrentWorkflowState,
    FinalizeResponse,
    MutationExecuteWorkflowArgs,
    MutationMarkFinalizableArgs,
    QueryQueryWorkflowArgs,
    ReplyResponse,
    RequireFields,
    Resolvers,
    ResolverTypeWrapper,
    Subscription,
    SubscriptionResolverObject, SubscriptionSubscribeFn,
    SubscriptionWorkflowStateArgs
} from '../gql/index.js'
import {Client} from '@temporalio/client'
import {executeWorkflow} from '../domain/workflows/workflow.js'
import {cfg} from '../config/index.js'
import {GraphQLResolveInfo, subscribe} from 'graphql'


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
//
// interface WorkflowStateSubscription {
//     resolve: (payload: any) => CurrentWorkflowState;
//     subscribe: (parent: Subscription, args: RequireFields<SubscriptionWorkflowStateArgs, "input">, context: any, info: GraphQLResolveInfo) => AsyncGenerator<unknown, void, unknown>
// }
type WorkflowStateSubscription = SubscriptionResolverObject<ResolverTypeWrapper<CurrentWorkflowState>, Subscription, any, RequireFields<SubscriptionWorkflowStateArgs, "input">>

const workflowStateSubscription = (client: Client): WorkflowStateSubscription => {

    return {
        subscribe: stateSub(client),
        resolve: (payload: any): CurrentWorkflowState => {
            console.log('returning payload', payload)
            return payload
        }
    }
}

async function* stateSub(client: Client) : AsyncIterable<CurrentWorkflowState> {
    return async function* (parent: Subscription, args: RequireFields<SubscriptionWorkflowStateArgs, "input">, context: any, info: GraphQLResolveInfo) {
        for await (const time of interval(1000)) {
            let wf = client.workflow.getHandle(args.input?.workflowId || 'notfound')
            yield await wf.query('currentState')
        }
    }
}

export const createResolvers = (client: Client): Resolvers => {
    const res: Resolvers = {
        Mutation: {
            executeWorkflow: async (_, args: Required<MutationExecuteWorkflowArgs>): Promise<ReplyResponse> => {
                let run = await client.workflow.start(executeWorkflow, {
                    args: [args.input],
                    taskQueue: cfg.Temporal.worker.taskQueue,
                    workflowId: args.input.workflowId,
                })

                return {value: args.input.value, id: args.input.workflowId, workflowId: run.workflowId}
            },
            markFinalizable: async (_, args: Required<MutationMarkFinalizableArgs>): Promise<FinalizeResponse> => {
                let wf = client.workflow.getHandle(args.input?.workflowId || 'notfound')
                await wf.signal('markFinalizable', args.input)
                return args.input
            }
        },
        Query: {
            queryWorkflow: async (_, args: QueryQueryWorkflowArgs): Promise<CurrentWorkflowState> => {

                let wf = client.workflow.getHandle(args.input?.workflowId || 'notfound')
                return wf.query('currentState')
            },
            appInfo: async (_: {}): Promise<AppInfo> => {
                return {
                    name: 'Temporal Application',
                    temporal: {
                        namespace: cfg.Temporal.connection.namespace,
                    }
                }
            }

        },
        Subscription: {
            workflowState:{
                subscribe:()=> {},
                resolve: () => {}
            }
        }
    }
    return res
}

let bonk: SubscriptionSubscribeFn<any, {}, any, RequireFields<SubscriptionWorkflowStateArgs, "input">> =
    async function*(_:any, _a: {}, _b: any, args: RequireFields<SubscriptionWorkflowStateArgs, "input">):(AsyncIterable<CurrentWorkflowState> | Promise<AsyncIterable<CurrentWorkflowState>>) => {
    for await (const time of interval(1000)) {
        let wf = client.workflow.getHandle(args.input?.workflowId || 'notfound')
        yield await wf.query('currentState')
    }
}