import {
    AppInfo,
    CurrentWorkflowState,
    FinalizeResponse,
    MutationExecuteWorkflowArgs,
    MutationMarkFinalizableArgs,
    QueryQueryWorkflowArgs,
    ReplyResponse,
    Resolvers,
    SubscriptionWorkflowStateArgs
} from '../gql/index.js'
import {Client} from '@temporalio/client'
import {executeWorkflow} from '../domain/workflows/workflow.js'
import {cfg} from '../config/index.js'
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
        for await (const time of interval(1000)) {
            let wf = client.workflow.getHandle(args.input?.workflowId || 'notfound')
            console.log('querying state')
            yield await wf.query('currentState')
        }
    }
}