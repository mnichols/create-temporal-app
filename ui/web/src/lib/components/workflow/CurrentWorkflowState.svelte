<script lang="ts">
    import {getContextClient, queryStore, subscriptionStore} from '@urql/svelte'
    import {
        type CurrentWorkflowState,
        QueryWorkflowDocument,
        SubCurrentWorkflowStateDocument
    } from '../../../gql/index.js'
    import {Logger} from '$lib/log/index.js'
    import WorkflowStateCard from '$lib/components/workflow/WorkflowStateCard.svelte'
    import {onDestroy} from 'svelte'

    let logger = Logger.child({component: 'CurrentWorkflowState'})

    export let workflowId: string
    export let shouldSubscribe: boolean

    let currentData: CurrentWorkflowState
    // actual data handler for each event from a subscription
    const handleData = (previousData: any | undefined, data: any) => {
        console.log('handleData', previousData, data)
        if (previousData) {
            logger.debug('previousData = %s', JSON.stringify(previousData))
        }
        if (!data) {
            return
        }
        currentData = data.workflowState
    }

    const stateStore = queryStore({
        client: getContextClient(),
        query: QueryWorkflowDocument,
        variables: {
            input: {
                workflowId,
                value: 'f'
            }
        }
    })
    if (stateStore && stateStore.subscribe) {
        stateStore.subscribe(arg => {
            if (arg?.data && arg?.data?.queryWorkflow) {
                handleData(null, arg.data.queryWorkflow)
            }
        })

    }

    let messages = subscriptionStore({
        client: getContextClient(),
        query: SubCurrentWorkflowStateDocument,
        variables: {input: {workflowId}}
    }, handleData)
    let unsub = messages.subscribe(arg => {
        return () => {
        }
    })
    onDestroy(unsub)


</script>
<div>

    <WorkflowStateCard workflowState={currentData}/>

    <!--{#if $stateStore.fetching || !$stateStore.data}-->
    <!--    <span class="loading loading-ball loading-xs"></span>-->
    <!--{:else if $stateStore.error}-->
    <!--    <p>{$stateStore.error}</p>-->
    <!--{:else if $stateStore.data}-->
    <!--    <WorkflowStateCard workflowState={currentData}/>-->
    <!--{/if}-->

    <!--{#if $messages}-->
    <!--    <p>{currentData.workflowId}</p>-->
    <!--{/if}-->
    <!--{#if $messages.fetching}-->
    <!--    <span class="loading loading-ball loading-xs"></span>-->
    <!--{:else if $messages.error}-->
    <!--    <p>ERROR</p>-->
    <!--    <p>{$messages.error}</p>-->
    <!--{:else if $messages.data}-->
    <!--    <p>DATA</p>-->

    <!--{/if}-->

</div>