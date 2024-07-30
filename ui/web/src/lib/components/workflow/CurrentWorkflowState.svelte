<script lang="ts">
    import {getContextClient, queryStore} from '@urql/svelte'
    import {QueryWorkflowDocument} from '../../../gql/index.js'
    import StateItem from '$lib/components/workflow/StateItem.svelte'

    export let workflowId: String
    const state = queryStore({
        client: getContextClient(),
        query: QueryWorkflowDocument,
        variables: {
            input: {
                workflowId,
                value: 'f'
            }
        }
    })

</script>
<div class='card bg-base-100 w-96 shadow-xl'>

    {#if $state.fetching}
        <span class="loading loading-ball loading-xs"></span>
    {:else if $state.error}
        <p>{$state.error}</p>
    {:else }
        <dl>
            <dt>Value</dt>
            <dd>{$state.data.queryWorkflow.value}</dd>
        </dl>
        <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400" data-theme='cupcake'>
            <li class="flex">
                <StateItem isCompleted={!!$state.data.queryWorkflow.validation} label='validation'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!$state.data.queryWorkflow.applicationMutation1} label='applicationMutation1'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!$state.data.queryWorkflow.applicationMutation2} label='applicationMutation2'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!$state.data.queryWorkflow.compensation} label='compensation'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!$state.data.queryWorkflow.reply} label='reply'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!$state.data.queryWorkflow.beginning} label='beginning'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!$state.data.queryWorkflow.finalizable} label='finalizable'/>
            </li>
            <li class="flex">
                <StateItem isCompleted={!!$state.data.queryWorkflow.finalization} label='finalization'/>
            </li>
        </ul>
    {/if}
    <!--    value: String!-->
    <!--    validation: ValidateResponse-->
    <!--    applicationMutation1: MutateApplicationResponse-->
    <!--    applicationMutation2: MutateApplicationResponse-->
    <!--    compensation: CompensateResponse-->
    <!--    reply: ReplyResponse-->
    <!--    beginning: BeginResponse-->
    <!--    finalizable: String-->
    <!--    finalization: FinalizeResponse-->
    <!--    workflowId: String!-->
</div>