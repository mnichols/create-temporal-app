import {writable} from 'svelte/store'

describe('createSettings', async () => {
    beforeEach(async () => {
        vi.mock('@urql/svelte', async () => {
            let mod = await vi.importActual('@urql/svelte')
            return {
                ...mod,
                subscriptionStore: vi.fn(() => writable(42)),
            }
        })
    })
    afterEach(async () => {
        vi.clearAllMocks()
    })
})