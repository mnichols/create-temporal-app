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
    let messages = subscriptionStore({client, query: SubPingDocument, variables: {input: {value: 'foo'}}}, handleData)
    messages.subscribe(arg2 => {
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

<header>
    <h1>Simple Subscription Diagnostics</h1>
    <h2>Default retry options for SSE Client found <a
            about='_blank'
            href='https://the-guild.dev/graphql/sse/docs/interfaces/client.ClientOptions#retry'>here</a>
    </h2>
</header>
<div class='indicator'>
    <span class="indicator-item indicator-start badge {$messages.error ? 'badge-error' : 'badge-accent'}"></span>
    <h1 class="grid w-64 h-16 bg-base-300 place-items-center">Subscriptions Connected</h1>
</div>

<!--{#if $ss.fetching}-->
<!--    <p>Loading...</p>-->
{#if $messages.error}
    <p class='text-error'>Error... {$messages.error.message}</p>
{:else if showVals.length < 1}
    <p class='text-secondary'>No Data</p>
{:else}
    <ul>
        {#each showVals as sub, index}
            <li>{index}-{sub}</li>
        {/each}
    </ul>
{/if}



