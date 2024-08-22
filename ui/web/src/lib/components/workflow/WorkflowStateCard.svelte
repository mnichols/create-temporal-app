<script lang="ts">
    import type {CurrentWorkflowState} from '$gql'
    import StateItem from '$lib/components/workflow/StateItem.svelte'

    export let workflowState: CurrentWorkflowState
</script>

<div class='card card-body w-96'>

    {#if workflowState}
        <dl>
            <dt>Value</dt>
            <dd>{workflowState.value}</dd>
        </dl>
        <ul class="max-w-md space-y-1 list-inside">
            <li class="flex">
                <StateItem isCompleted={!!workflowState.validation} item={workflowState?.validation}
                           label='validation'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!workflowState.applicationMutation1} item={workflowState?.validation}
                           label='applicationMutation1'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!workflowState.applicationMutation2} item={workflowState?.validation}
                           label='applicationMutation2'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!workflowState.compensation} item={workflowState?.validation}
                           label='compensation'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!workflowState.reply} item={workflowState?.validation} label='reply'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!workflowState.beginning} item={workflowState?.validation} label='beginning'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!workflowState.finalizable} item={workflowState?.validation}
                           label='finalizable'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!workflowState.finalization} item={workflowState?.validation}
                           label='finalization'/>
            </li>
        </ul>
    {/if}
</div>