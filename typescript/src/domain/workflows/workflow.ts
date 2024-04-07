// import type * as activities from './activities';
import {ExecuteWorkflowRequest} from '../../gql/index.js'

// const {greet} = proxyActivities<typeof activities>({
//     startToCloseTimeout: '1 minute',
// });

export async function executeWorkflow(params: ExecuteWorkflowRequest): Promise<void> {
    console.log('received', params.value)
}