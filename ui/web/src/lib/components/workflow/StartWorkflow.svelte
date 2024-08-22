<script lang='ts'>
    import {getContextClient, mutationStore} from '@urql/svelte'
    import {humanId} from 'human-id'
    import {AuthorizePaymentDocument} from '$gql'
    import {go} from '$lib/nav/index.js'
    import {Logger} from '$lib/log/index.js'
    import WorkflowLink from '$lib/components/workflow/WorkflowLink.svelte'

    let logger = Logger.child({component: 'startWorkflow'})
    let defaultId = humanId({capitalize: false, separator: '-'})
    let client = getContextClient()
    let startedWorkflowId: string | undefined | null
    let error: string | undefined | null

    async function startWorkflow(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        startedWorkflowId = formData.get('id')
        if (startedWorkflowId && formData.get('workflow-value')) {
            mutationStore({
                client,
                query: AuthorizePaymentDocument,
                variables: {
                    input: {
                        paymentId: formData.get('id'),
                        accountId: formData.get('account-id'),
                        value: formData.get('workflow-value'),
                    },
                }
            }).subscribe(arg => {
                if (arg?.data?.authorizePayment) {
                    console.log('redirecting', arg?.data?.authorizePayment)
                    go(`/app/${arg.data.authorizePayment.paymentId}`)
                } else if (arg?.error?.graphQLErrors) {
                    error = arg.error.graphQLErrors.reduce((msg, e) => msg + '\n' + e, 'Error:')
                }
            })

        }
    }
</script>

<form on:submit|preventDefault={startWorkflow} class='flex flex-col'>
    <label for='id' class='label'>
        <span class='label-text'>Payment ID</span>
        <input type='text' name='id' placeholder='Enter id here' required
               class='input w-full max-w-xs'
               value={defaultId}/>
    </label>
    <label for='account-id' class='label'>
        <span class='label-text'>Account ID</span>
        <input type='text' name='account-id' placeholder='Enter value here' required class='input w-full max-w-xs'/>
    </label>

    <label for='workflow-value' class='label'>
        <span class='label-text'>Amount</span>
        <input type='text' name='workflow-value' placeholder='Enter value here' required class='input w-full max-w-xs'/>
    </label>
    <button type='submit' class='btn accent-green-200' disabled={!!startedWorkflowId}>Make Payment</button>
    {#if startedWorkflowId}
        <div>
            <WorkflowLink workflowId={startedWorkflowId} label='Workflow {startedWorkflowId}'/>
        </div>
    {/if}
</form>
{#if error}
    <div class='text-error'>{error}</div>

{/if}