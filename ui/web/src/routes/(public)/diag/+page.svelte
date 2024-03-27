<script lang="ts">
    import {getContextClient, subscriptionStore} from "@urql/svelte";
    import {Logger} from '$lib/log/index.js'
    import {SubPingDocument} from '$gql'
    import {serializeError} from 'serialize-error'

    let logger = Logger.child({component: 'diag'})
    let vals: string[] = []
    $: showVals = vals
    let client = getContextClient()
    // actual data handler for each event from a subscription
    const handleData = (previousData: any | undefined, data: any) => {
        if (previousData) {
            logger.debug('previousData = %s', JSON.stringify(previousData))
        }
        if (!data) {
            return
        }
        logger.debug('current data = %s', JSON.stringify(data))

        vals = [...vals, data.subPing.value]
    }
    // see here for subscriptionStore docs: https://commerce.nearform.com/open-source/urql/docs/api/svelte/
    let ss = subscriptionStore({client, query: SubPingDocument, variables: {input: {value: 'foo'}}}, handleData)
    ss.subscribe(arg2 => {
        if (arg2.error) {
            logger.error({
                error: serializeError(arg2.error)
            }, 'subscriptionStore errored')
            return
        }

        if (arg2.fetching) {
            logger.debug('fetching')
        }
        if (arg2.stale) {
            logger.debug('stale')
        }
        return () => {
            logger.debug('ss.unsubscribing')
        }
    })

</script>

<h1>Subscription Diagnostics</h1>
<!--{#if $ss.fetching}-->
<!--    <p>Loading...</p>-->
{#if $ss.error}
    <p>Error... {$ss.error.message}</p>
{:else}
    <ul>
        {#each showVals as sub, index}
            <li>{index}-{sub}</li>
        {/each}
    </ul>
{/if}

