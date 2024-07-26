import {
    AppInfo,
    ExecuteWorkflowState,
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
                    workflowId: `wf_${args.input.id}`,
                })

                return {value: args.input.value, id: args.input.id, workflowId: run.workflowId}
            },
            markFinalizable: async (_, args: Required<MutationMarkFinalizableArgs>): Promise<FinalizeResponse> => {
                return {value: args.input.value}
            }
        },
        Query: {
            queryWorkflow: async (_, args: QueryQueryWorkflowArgs): Promise<ExecuteWorkflowState> => {

                let result = await client.workflow.getHandle(args.input?.id || 'notfound')
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