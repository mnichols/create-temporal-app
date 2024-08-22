import {
    AppInfo,
    CurrentWorkflowState,
    FinalizeResponse,
    MutationMarkFinalizableArgs,
    MutationStartWorkflowArgs,
    QueryQueryWorkflowArgs,
    ReplyResponse,
    Resolvers,
} from '../gql/index.js'
import {Client} from '@temporalio/client'
import {authorizePayment} from '../domain/workflows/authorizePayment.js'
import {cfg} from '../config/index.js'

export const createResolvers = (client: Client): Resolvers => {
    const res: Resolvers = {
        Mutation: {
            startWorkflow: async (_, args: Required<MutationStartWorkflowArgs>): Promise<ReplyResponse> => {
                let run = await client.workflow.start(authorizePayment, {
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
    }
    return res
}