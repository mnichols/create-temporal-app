<script lang='ts'>
    import {getContextClient, mutationStore} from '@urql/svelte'
    import {humanId} from 'human-id'
    import {ExecuteWorkflowDocument} from '$gql'
    import {go} from '$lib/nav/index.js'

    let defaultId = humanId({capitalize: false, separator: '-'})
    let workflow
    let client = getContextClient()

    async function executeWorkflow(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        if (formData.get('workflow-value')) {
            workflow = mutationStore({
                client,
                query: ExecuteWorkflowDocument,
                variables: {
                    input: {
                        workflowId: formData.get('id'),
                        value: formData.get('workflow-value'),
                    },
                }
            }).subscribe(arg => {
                console.log('received', arg)
                if (arg?.data?.executeWorkflow) {
                    console.log('redirecting', arg.data.executeWorkflow.workflowId)
                    go(`/app/${arg.data.executeWorkflow.workflowId}`)
                }
            })

        }
    }
</script>

<form on:submit|preventDefault={executeWorkflow} class='flex flex-col'>
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
