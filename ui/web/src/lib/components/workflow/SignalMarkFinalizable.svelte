<script lang="ts">
    import {getContextClient, mutationStore} from '@urql/svelte'
    import {CaptureDocument, type CurrentPaymentState} from '$gql'

    export let workflowState: CurrentPaymentState
    const client = getContextClient()

    async function markFinalizable(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        if (formData.get('value')) {
            let workflow = mutationStore({
                client,
                query: CaptureDocument,
                variables: {
                    input: {
                        workflowId: workflowState.paymentCompletionId,
                        value: formData.get('value'),
                    },
                }
            })
        }
    }
</script>
<div>Completion Workflow ID: <span>{workflowState.paymentCompletionId}</span></div>
<form on:submit|preventDefault={markFinalizable} class='flex flex-col'>
    <label for='value' class='label'>
        <span class='label-text'>Value</span>
        <input type='text' name='value' placeholder='Enter value here' required class='input w-full max-w-xs'
               value={workflowState.value}/>
    </label>

    <button type='submit' class='btn accent-green-200'>Capture Funds</button>
</form>