<script lang="ts">
    import {mutationStore} from '@urql/svelte'
    import {go} from '$lib/nav/index.js'

    async function markFinalizable(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        if (formData.get('workflow-value')) {
            workflow = mutationStore({
                client,
                query: MarkFinalizableDocument,
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
</script>

<form on:submit|preventDefault={markFinalizable} class='flex flex-col'>
    <label for='value' class='label'>
        <span class='label-text'>Value</span>
        <input type='text' name='value' placeholder='Enter value here' required class='input w-full max-w-xs'/>
    </label>

    <button type='submit' class='btn accent-green-200'>Mark Finalizable</button>
</form>