import {
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
                await client.workflow.start(executeWorkflow, {
                    args: [{value: args.input.value}],
                    taskQueue: cfg.Temporal.worker.taskQueue,
                    workflowId: 'myfirstworkflow',
                })
                return {value: args.input.value}
            },
            markFinalizable: async (_, args: Required<MutationMarkFinalizableArgs>): Promise<FinalizeResponse> => {
                return {value: args.input.value}
            }
        },
        Query: {
            queryWorkflow: async (_, args: QueryQueryWorkflowArgs): Promise<ExecuteWorkflowState> => {
                return {value: args.input?.value || 'no value'}
            }
        }
    }
    return res
}