import {Worker, type WorkerOptions} from '@temporalio/worker';
import {createNativeConnection} from '../../clients/temporal/index.js'
import {Config} from '../../config/index.js'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const createWorkerOptions = async (cfg: Config, activities?: object | undefined): Promise<WorkerOptions> => {
    const {Temporal: tcfg} = cfg
    const connection = await createNativeConnection(tcfg)
    const workerOpts: WorkerOptions = {
        activities,
        // buildId: '',
        // bundlerOptions: {},
        connection,
        // dataConverter: undefined,
        // debugMode: false,
        // defaultHeartbeatThrottleInterval: undefined,
        // enableNonLocalActivities: false,
        // enableSDKTracing: false,
        // identity: '',
        // interceptors: undefined,
        maxActivitiesPerSecond: tcfg.worker.rateLimits.maxWorkerActivitiesPerSecond,
        maxCachedWorkflows: 0,
        maxConcurrentActivityTaskExecutions: tcfg.worker.capacity.maxConcurrentActivityExecutors,
        maxConcurrentActivityTaskPolls: tcfg.worker.capacity.maxConcurrentActivityTaskPollers,
        maxConcurrentLocalActivityExecutions: tcfg.worker.capacity.maxConcurrentLocalActivityExecutors,
        maxConcurrentWorkflowTaskExecutions: tcfg.worker.capacity.maxConcurrentWorkflowTaskExecutions,
        maxConcurrentWorkflowTaskPolls: tcfg.worker.capacity.maxConcurrentWorkflowTaskPollers,
        // maxHeartbeatThrottleInterval: undefined,
        maxTaskQueueActivitiesPerSecond: tcfg.worker.rateLimits.maxTaskQueueActivitiesPerSecond,
        namespace: tcfg.connection.namespace,
        // nonStickyToStickyPollRatio: 0,
        // reuseV8Context: false,
        // showStackTraceSources: false,
        // shutdownForceTime: undefined,
        // shutdownGraceTime: undefined,
        // sinks: undefined,
        // stickyQueueScheduleToStartTimeout: undefined,
        taskQueue: tcfg.worker.taskQueue,
        // workflowBundle: undefined,
        // workflowThreadPoolSize: 0,
        // workflowsPath: '',
    }
    if (!cfg.IsProduction) {
        workerOpts.workflowsPath = path.join(__dirname, '../workflows/index.ts')
    } else {
        workerOpts.workflowBundle = {
            codePath: 'build/workflows.bundle.js'
        }
    }
    return workerOpts
}
export const createWorker = async (opts: WorkerOptions): Promise<Worker> => {
    return await Worker.create(opts)
}

