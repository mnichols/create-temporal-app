<script lang="ts">
    import {type CurrentWorkflowState} from '../../../gql/index.js'
    import {Logger} from '$lib/log/index.js'
    import WorkflowStateCard from '$lib/components/workflow/WorkflowStateCard.svelte'

    let logger = Logger.child({component: 'CurrentWorkflowState'})

    export let workflowState: string

</script>
<div>

    <WorkflowStateCard workflowState={workflowState}/>

    <!--{#if $stateStore.fetching || !$stateStore.data}-->
    <!--    <span class="loading loading-ball loading-xs"></span>-->
    <!--{:else if $stateStore.error}-->
    <!--    <p>{$stateStore.error}</p>-->
    <!--{:else if $stateStore.data}-->
    <!--    <WorkflowStateCard workflowState={currentData}/>-->
    <!--{/if}-->

    <!--{#if $messages}-->
    <!--    <p>{currentData.workflowId}</p>-->
    <!--{/if}-->
    <!--{#if $messages.fetching}-->
    <!--    <span class="loading loading-ball loading-xs"></span>-->
    <!--{:else if $messages.error}-->
    <!--    <p>ERROR</p>-->
    <!--    <p>{$messages.error}</p>-->
    <!--{:else if $messages.data}-->
    <!--    <p>DATA</p>-->

    <!--{/if}-->

</div>