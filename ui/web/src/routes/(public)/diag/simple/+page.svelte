<script lang="ts">
    import {getContextClient, subscriptionStore} from "@urql/svelte";
    import {SubPingDocument} from '$gql'

    let vals: string[] = []
    $: showVals = vals
    let client = getContextClient()
    // see here for subscriptionStore docs: https://commerce.nearform.com/open-source/urql/docs/api/svelte/
    let messages = subscriptionStore({client, query: SubPingDocument, variables: {input: {value: 'foo'}}})
    
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
<!--{#if $messages.fetching}-->
<!--    <p>Loading...</p>-->
{#if $messages.error}
    <p class='text-error'>Error... {$messages.error.message}</p>
{:else if !$messages.data}
    <p class='text-secondary'>No Data</p>
{:else}
    <p>Current Value: {$messages.data.subPing.value}</p>
    <!--    <ul>-->
    <!--        {#each $messages.data.subPing as sub, index}-->
    <!--            <li>{index}-{sub}</li>-->
    <!--        {/each}-->
    <!--    </ul>-->
{/if}

