<script lang="ts">
    import type {CurrentPaymentState, PaymentAuthorizationResponse} from '$gql'
    import StateItem from '$lib/components/workflow/StateItem.svelte'

    export let workflowState: CurrentPaymentState

    function calcApprovalState(auth: PaymentAuthorizationResponse | undefined) {
        if (!auth) {
            return 0
        }
        if (auth.approved) {
            return 1
        }

        return -1
    }
</script>

<div class='card card-body w-120'>
    {#if workflowState}
        <p><span class='font-extrabold mr-8'>Account ID:</span><span>{workflowState.accountId}</span></p>
        <p><span class='font-extrabold mr-8'>Amount:</span><span>{workflowState.value}</span></p>
        <ul class="max-w-md space-y-1 list-inside">
            <li class="flex">
                <StateItem state={calcApprovalState(workflowState?.authorization)}
                           value={`token is ${workflowState?.authorization?.token}`} label='authorization'/>
            </li>
            <!--            <li class="flex">-->
            <!--                <StateItem isCompleted={!!workflowState.applicationMutation1} item={workflowState?.applicationMutation1}-->
            <!--                           label='applicationMutation1'/>-->
            <!--            </li>-->
            <!--            <li class="flex">-->
            <!--                <StateItem isCompleted={!!workflowState.applicationMutation2} item={workflowState?.applicationMutation2}-->
            <!--                           label='applicationMutation2'/>-->
            <!--            </li>-->
            <!--            <li class="flex">-->
            <!--                <StateItem isCompleted={!!workflowState.compensation} item={workflowState?.compensation}-->
            <!--                           label='compensation'/>-->
            <!--            </li>-->

            <!--            <li class="flex">-->
            <!--                <StateItem isCompleted={!!workflowState.beginning} item={workflowState?.beginning} label='beginning'/>-->
            <!--            </li>-->
            <!--            <li class="flex">-->
            <!--                <StateItem isCompleted={!!workflowState.finalizable} item={workflowState?.finalizable}-->
            <!--                           label='finalizable'/>-->
            <!--            </li>-->
            <!--            <li class="flex">-->
            <!--                <StateItem isCompleted={!!workflowState.finalization} item={workflowState?.finalization}-->
            <!--                           label='finalization'/>-->
            <!--            </li>-->
        </ul>
    {/if}

</div>