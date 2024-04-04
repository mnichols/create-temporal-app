import {createWorker, createWorkerOptions} from './workers/worker.js'
import {cfg} from '../config/index.js'

const worker = await createWorker(await createWorkerOptions(cfg))

await worker.run().catch(err => {
    console.error(err)
    process.exit(1)
})