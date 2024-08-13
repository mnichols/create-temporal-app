<script lang="ts">
    import {page} from '$app/stores'
    import WorkflowLink from '$lib/components/workflow/WorkflowLink.svelte'
    import SignalMarkFinalizable from '$lib/components/workflow/SignalMarkFinalizable.svelte'
    import {getContextClient, queryStore, subscriptionStore} from '@urql/svelte'
    import {type CurrentWorkflowState, QueryWorkflowDocument, SubCurrentWorkflowStateDocument} from '$gql'
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
<div class='flex flex-col'>
    <WorkflowStateCard workflowState={workflowState}/>
</div>
<div class='flex flex-col'>
    {#if workflowState && !workflowState.finalization}
        <SignalMarkFinalizable workflowState={workflowState}/>
    {/if}
</div>