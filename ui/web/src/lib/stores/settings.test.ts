import {writable} from 'svelte/store'
import {describe} from 'vitest'

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
    describe('given temporal settings', async () => {
        it('should init with app info', async () => {
            expect(42).to.eq(42)
        })
    })
})