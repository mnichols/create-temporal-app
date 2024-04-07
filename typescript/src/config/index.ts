import dotenv from 'dotenv-extended'
import fs from 'fs/promises'

const envCfg = dotenv.load()

export interface Config {
    Temporal: TemporalConfig
    IsProduction: boolean
}

export interface TemporalMTLS {
    pkcs?: string
    key?: Buffer
    keyFile?: string
    certChain?: Buffer
    certChainFile?: string
    keyPassword?: string
    insecureTrustManager?: boolean
    serverName?: string
    serverRootCACertificate?: Buffer
    serverRootCACertificateFile?: string
}

export interface TemporalWorkerCapacity {
    maxConcurrentWorkflowTaskExecutions?: number
    maxConcurrentActivityExecutors?: number
    maxConcurrentLocalActivityExecutors?: number
    maxConcurrentWorkflowTaskPollers?: number
    maxConcurrentActivityTaskPollers?: number
    maxCachedWorkflows?: number
}

export interface TemporalWorkerRateLimits {
    maxWorkerActivitiesPerSecond?: number
    maxTaskQueueActivitiesPerSecond?: number
}

export interface TemporalWorker {

    taskQueue: string
    name?: string
    capacity?: TemporalWorkerCapacity
    rateLimits?: TemporalWorkerRateLimits
}

// #TEMPORAL_WORKER_RATE_LIMITS_MAX_WORKER_ACTIVITIES_PER_SECOND=
export interface TemporalConnection {
    namespace: string
    target: string
    mtls: TemporalMTLS | undefined
}

//     #TEMPORAL_WORKER_RATE_LIMITS_MAX_TASK_QUEUE_ACTIVITIES_PER_SECOND=
export interface TemporalConfig {
    connection: TemporalConnection
    worker: TemporalWorker
}

const createTemporalCfg = async (): Promise<TemporalConfig> => {
    const mtls: TemporalMTLS = {
        certChainFile: process.env['TEMPORAL_CONNECTION_MTLS_CERT_CHAIN_FILE'],
        keyFile: process.env['TEMPORAL_CONNECTION_MTLS_KEY_FILE'],
        //key: Buffer.from(process.env['TEMPORAL_CONNECTION_MTLS_KEY'] || ''),
        //certChain: Buffer.from(process.env['TEMPORAL_CONNECTION_MTLS_CERT_CHAIN'] || ''),
        pkcs: process.env['TEMPORAL_CONNECTION_MTLS_PKCS'],
        insecureTrustManager: Boolean(process.env['TEMPORAL_CONNECTION_MTLS_INSECURE_TRUST_MANAGER'] || 'false'),
        keyPassword: process.env['TEMPORAL_CONNECTION_MTLS_KEY_PASSWORD'],
        serverName: process.env['TEMPORAL_CONNECTION_MTLS_SERVER_NAME'],
        serverRootCACertificateFile: process.env['TEMPORAL_CONNECTION_MTLS_SERVER_ROOT_CA_CERTIFICATE_FILE']
    }
    if (process.env['TEMPORAL_CONNECTION_MTLS_KEY']) {
        mtls.key = Buffer.from(process.env['TEMPORAL_CONNECTION_MTLS_KEY'])
    } else if (mtls.keyFile) {
        mtls.key = await fs.readFile(mtls.keyFile)
    }
    if (process.env['TEMPORAL_CONNECTION_MTLS_CERT_CHAIN']) {
        mtls.certChain = Buffer.from(process.env['TEMPORAL_CONNECTION_MTLS_CERT_CHAIN'])
    } else if (mtls.certChainFile) {
        mtls.certChain = await fs.readFile(mtls.certChainFile)
    }

    if (process.env['TEMPORAL_CONNECTION_MTLS_SERVER_ROOT_CA_CERTIFICATE']) {
        mtls.serverRootCACertificate = Buffer.from(process.env['TEMPORAL_CONNECTION_MTLS_SERVER_ROOT_CA_CERTIFICATE'])
    } else if (mtls.serverRootCACertificateFile) {
        mtls.serverRootCACertificate = Buffer.from(await fs.readFile(mtls.serverRootCACertificateFile))
    }

    const worker: TemporalWorker = {
        capacity: {
            maxConcurrentWorkflowTaskExecutions: numOrNot('TEMPORAL_WORKER_CAPACITY_MAX_CONCURRENT_WORKFLOW_TASK_EXECUTORS'),
            maxConcurrentActivityExecutors: numOrNot('TEMPORAL_WORKER_CAPACITY_MAX_CONCURRENT_ACTIVITY_EXECUTORS'),
            maxConcurrentLocalActivityExecutors: numOrNot('TEMPORAL_WORKER_CAPACITY_MAX_CONCURRENT_LOCAL_ACTIVITY_EXECUTORS'),
            maxConcurrentWorkflowTaskPollers: numOrNot('TEMPORAL_WORKER_CAPACITY_MAX_CONCURRENT_WORKFLOW_TASK_POLLERS'),
            maxConcurrentActivityTaskPollers: numOrNot('TEMPORAL_WORKER_CAPACITY_MAX_CONCURRENT_ACTIVITY_TASK_POLLERS'),
            maxCachedWorkflows: numOrNot('TEMPORAL_WORKER_CAPACITY_MAX_CACHED_WORKFLOWS'),
        },
        name: '',
        rateLimits: {
            maxWorkerActivitiesPerSecond: numOrNot('TEMPORAL_WORKER_RATE_LIMITS_MAX_WORKER_ACTIVITIES_PER_SECOND'),
            maxTaskQueueActivitiesPerSecond: numOrNot('TEMPORAL_WORKER_RATE_LIMITS_MAX_TASK_QUEUE_ACTIVITIES_PER_SECOND'),
        },
        taskQueue: assertCfg('TEMPORAL_WORKER_TASK_QUEUE')
    }
    const connection: TemporalConnection = {
        namespace: assertCfg('TEMPORAL_CONNECTION_NAMESPACE'),
        target: assertCfg('TEMPORAL_CONNECTION_TARGET'),
        mtls: mtls,
    }
    return {
        connection: connection,
        worker: worker,
    }
}

const temporalCfg = await createTemporalCfg()

export const cfg: Config =
    {
        Temporal: temporalCfg,
        IsProduction: process.env['NODE_ENV']?.toLowerCase() === 'production'
    }

function numOrNot(key: string): number | undefined {
    if (process.env[key]) {
        return Number(process.env[key])
    }
    return undefined
}

export function assertCfg(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new ReferenceError(`${name} environment variable is not defined`);
    }
    return value;
}
