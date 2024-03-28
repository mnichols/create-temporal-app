<script lang="ts">
    import {getContextClient, subscriptionStore} from "@urql/svelte";
    import {Logger} from '$lib/log/index.js'
    import {SubPingDocument} from '$gql'
    import {serializeError} from 'serialize-error'
    import Status from '$lib/components/connection/Status.svelte'
    import {onDestroy} from 'svelte'

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

        vals = [data.subPing.value, ...vals]
    }
    // see here for subscriptionStore docs: https://commerce.nearform.com/open-source/urql/docs/api/svelte/
    let messages = subscriptionStore({client, query: SubPingDocument, variables: {input: {value: 'ping'}}}, handleData)
    let unsubscribe = messages.subscribe(arg2 => {
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
    onDestroy(unsubscribe)
</script>

<header>
    <h1>Simple Subscription Diagnostics</h1>
    <h2>Default retry options for SSE Client found <a
            class='link'
            about='_blank'
            href='https://the-guild.dev/graphql/sse/docs/interfaces/client.ClientOptions#retry'>here</a>
    </h2>
</header>
<Status store={messages}/>
<!--<div class='indicator'>-->
<!--    <span class="indicator-item badge {$messages.error ? 'badge-error' : 'badge-accent'}"></span>-->
<!--    <h1 class="grid w-64 h-16 bg-base-300 place-items-center">Subscription Status</h1>-->
<!--</div>-->

<!--{#if $ss.fetching}-->
<!--    <p>Loading...</p>-->
{#if $messages.error}
    <p class='text-error'>Error... {$messages.error.message}</p>
{:else if showVals.length < 1}
    <p class='text-secondary'>No Data</p>
{:else}
    <div class='overflow-y-auto h-128'>
        <ul>
            {#each showVals as sub, index}
                <li>
                    <div class='bg-neutral text-neutral-content'>{index}-{sub}</div>
                    <div class="divider">--</div>
                </li>
            {/each}
        </ul>
    </div>
{/if}



