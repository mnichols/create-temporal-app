<script lang="ts">
    import {page} from '$app/stores'
    import WorkflowLink from '$lib/components/workflow/WorkflowLink.svelte'
    import {getContextClient, queryStore, subscriptionStore} from '@urql/svelte'
    import {type CurrentPaymentState, QueryWorkflowDocument, SubCurrentPaymentStateDocument} from '$gql'
    import {onDestroy} from 'svelte'
    import WorkflowStateCard from '$lib/components/workflow/WorkflowStateCard.svelte'
    import {Logger} from '$lib/log/index.js'

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
        console.log('setting workflowState', data.workflowState)
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
    }, (arg1, arg2) => {
        console.log('arg1', arg1)
        console.log('arg2', arg2)
        handleData(arg1, arg2)
    })
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

