<script lang="ts">
    import {type CurrentWorkflowState} from '../../../gql/index.js'
    import {Logger} from '$lib/log/index.js'
    import WorkflowStateCard from '$lib/components/workflow/WorkflowStateCard.svelte'

    let logger = Logger.child({component: 'CurrentWorkflowState'})

    export let workflowState: CurrentWorkflowState

</script>
<div>

    <WorkflowStateCard workflowState={workflowState}/>
</div>