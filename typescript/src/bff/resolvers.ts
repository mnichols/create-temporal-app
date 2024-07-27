import {
    AppInfo,
    CurrentWorkflowState,
    FinalizeResponse,
    MutationExecuteWorkflowArgs,
    MutationMarkFinalizableArgs,
    QueryQueryWorkflowArgs,
    ReplyResponse,
    Resolvers
} from '../gql/index.js'
import {Client} from '@temporalio/client'
import {executeWorkflow} from '../domain/workflows/workflow.js'
import {cfg} from '../config/index.js'

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
                return {value: args.input.value}
            }
        },
        Query: {
            queryWorkflow: async (_, args: QueryQueryWorkflowArgs): Promise<CurrentWorkflowState> => {

                let result = client.workflow.getHandle(args.input?.workflowId || 'notfound')
                return result.query('currentState')
            },
            appInfo: async (_: {}): Promise<AppInfo> => {
                return {
                    name: 'Temporal Application',
                    temporal: {
                        namespace: cfg.Temporal.connection.namespace,
                    }
                }
            }

        }
    }
    return res
}