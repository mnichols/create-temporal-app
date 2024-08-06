<script lang="ts">
    import {page} from '$app/stores'
    import CurrentWorkflowState from '$lib/components/workflow/CurrentWorkflowState.svelte'
    import WorkflowLink from '$lib/components/workflow/WorkflowLink.svelte'

    let workflowId = $page.params.workflowId
</script>
<header class='flex'>
    <h1 class='flex'>
        <WorkflowLink workflowId={workflowId} label='Workflow {workflowId}'/>
    </h1>
</header>
<CurrentWorkflowState workflowId={workflowId} shouldSubscribe=true/>

