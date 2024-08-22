<script lang='ts'>
    import {getContextClient, mutationStore} from '@urql/svelte'
    import {humanId} from 'human-id'
    import {StartWorkflowDocument} from '$gql'
    import {go} from '$lib/nav/index.js'
    import {Logger} from '$lib/log/index.js'

    let logger = Logger.child({component: 'startWorkflow'})
    let defaultId = humanId({capitalize: false, separator: '-'})
    let client = getContextClient()

    async function startWorkflow(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        if (formData.get('workflow-value')) {
            mutationStore({
                client,
                query: StartWorkflowDocument,
                variables: {
                    input: {
                        workflowId: formData.get('id'),
                        value: formData.get('workflow-value'),
                    },
                }
            }).subscribe(arg => {
                logger.debug(arg, 'received')
                if (arg?.data?.startWorkflow) {
                    logger.debug('redirecting', arg.data.startWorkflow?.workflowId)
                    go(`/app/${arg.data.startWorkflow.workflowId}`)
                }
            })

        }
    }
</script>

<form on:submit|preventDefault={startWorkflow} class='flex flex-col'>
    <label for='id' class='label'>
        <span class='label-text'>ID</span>
        <input type='text' name='id' placeholder='Enter id here' required
               class='input w-full max-w-xs'
               value={defaultId}/>
    </label>
    <label for='workflow-value' class='label'>
        <span class='label-text'>Value</span>
        <input type='text' name='workflow-value' placeholder='Enter value here' required class='input w-full max-w-xs'/>
    </label>

    <button type='submit' class='btn accent-green-200'>Start Workflow</button>
</form>

<!--{#if $workflow && $workflow.data}-->
<!--    <a href='{$workflow.data.executeWorkflow.workflowId}' class='link'>{$workflow.data.executeWorkflow.workflowId}</a>-->
<!--{/if}-->
