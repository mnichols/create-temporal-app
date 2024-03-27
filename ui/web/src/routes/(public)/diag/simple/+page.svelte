<script lang="ts">
    import {getContextClient, subscriptionStore} from "@urql/svelte";
    import {SubPingDocument} from '$gql'

    let vals: string[] = []
    $: showVals = vals
    let client = getContextClient()
    // see here for subscriptionStore docs: https://commerce.nearform.com/open-source/urql/docs/api/svelte/
    let messages = subscriptionStore({client, query: SubPingDocument, variables: {input: {value: 'foo'}}})

</script>

<h1>Simple Subscription Diagnostics</h1>
<!--{#if $messages.fetching}-->
<!--    <p>Loading...</p>-->
{#if $messages.error}
    <p>Error... {$messages.error.message}</p>
{:else if !$messages.data}
    <p>No Data</p>
{:else}
    <p>Current Value: {$messages.data.subPing.value}</p>
    <!--    <ul>-->
    <!--        {#each $messages.data.subPing as sub, index}-->
    <!--            <li>{index}-{sub}</li>-->
    <!--        {/each}-->
    <!--    </ul>-->
{/if}

