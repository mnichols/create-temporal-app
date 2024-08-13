<script lang="ts">
    import {getContextClient, mutationStore} from '@urql/svelte'
    import {type CurrentWorkflowState, MarkFinalizableDocument} from '$gql'

    export let workflowState: CurrentWorkflowState
    const client = getContextClient()

    async function markFinalizable(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        if (formData.get('value')) {
            let workflow = mutationStore({
                client,
                query: MarkFinalizableDocument,
                variables: {
                    input: {
                        workflowId: workflowState.workflowId,
                        value: formData.get('value'),
                    },
                }
            })
        }
    }
</script>

<form on:submit|preventDefault={markFinalizable} class='flex flex-col'>
    <label for='value' class='label'>
        <span class='label-text'>Value</span>
        <input type='text' name='value' placeholder='Enter value here' required class='input w-full max-w-xs'/>
    </label>

    <button type='submit' class='btn accent-green-200'>Mark Finalizable</button>
</form>