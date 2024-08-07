<script lang="ts">
    import {page} from '$app/stores'
    import CurrentWorkflowState from '$lib/components/workflow/CurrentWorkflowState.svelte'
    import WorkflowLink from '$lib/components/workflow/WorkflowLink.svelte'
    import SignalMarkFinalizable from '$lib/components/workflow/SignalMarkFinalizable.svelte'
    import {getContextClient, queryStore, subscriptionStore} from '@urql/svelte'
    import {QueryWorkflowDocument, SubCurrentWorkflowStateDocument} from '../../../../gql/index.js'
    import {onDestroy} from 'svelte'
    import WorkflowStateCard from '$lib/components/workflow/WorkflowStateCard.svelte'

    let workflowId = $page.params.workflowId

    let workflowState: CurrentWorkflowState
    // actual data handler for each event from a subscription
    const handleData = (previousData: any | undefined, data: any) => {
        console.log('handleData', previousData, data)
        if (previousData) {
            logger.debug('previousData = %s', JSON.stringify(previousData))
        }
        if (!data) {
            return
        }
        workflowState = data.workflowState
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
<header class='flex'>
    <h1 class='flex'>
        <WorkflowLink workflowId={workflowId} label='Workflow {workflowId}'/>
    </h1>
</header>
    <WorkflowStateCard workflowState={workflowState} shouldSubscribe=true/>
        {#if workflowState && !workflowState.finalization}
            <SignalMarkFinalizable workflowState={workflowState}/>
        {/if}