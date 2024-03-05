<script lang="ts">
    import Settings from '$lib/components/settings/Settings.svelte'
    import {getContextClient, subscriptionStore} from "@urql/svelte";
    import {Logger} from '$lib/log/index.js'
    import {SubPingDocument} from '$gql'

    let client = getContextClient()
    let ss = subscriptionStore({client, query: SubPingDocument, variables: {input: {value: 'foo'}}})
    ss.subscribe(arg2 => {

        Logger.debug('subscriptionStore %s', JSON.stringify(arg2)) //, 'received update from cart subscription')
        if (arg2.stale || (!arg2.data && !arg2.error)) {
            return
        }
        return () => {
            Logger.debug('ss.unsubscribing')
        }
    })
</script>

<Settings/>
