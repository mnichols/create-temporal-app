<script lang="ts">
    import {page} from '$app/stores'
    import WorkflowLink from '$lib/components/workflow/WorkflowLink.svelte'
    import {getContextClient, queryStore, subscriptionStore} from '@urql/svelte'
    import {type CurrentPaymentState, QueryWorkflowDocument, SubCurrentPaymentStateDocument} from '$gql'
    import {onDestroy} from 'svelte'
    import WorkflowStateCard from '$lib/components/workflow/WorkflowStateCard.svelte'
    import {Logger} from '$lib/log/index.js'
    import SignalMarkFinalizable from '$lib/components/workflow/SignalMarkFinalizable.svelte'

    let workflowId = $page.params.workflowId

    let workflowState: CurrentPaymentState
    let logger = Logger.child({component: 'app[workflowId]'})
    // actual data handler for each event from a subscription
    const handleData = (previousData: any | undefined, data: any) => {
        console.log('handleData', data)
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
        query: SubCurrentPaymentStateDocument,
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
{#if workflowState && !workflowState.finalization}
    <div class='flex flex-col border-8 border-accent'>
        <SignalMarkFinalizable workflowState={workflowState}/>
    </div>
{/if}


