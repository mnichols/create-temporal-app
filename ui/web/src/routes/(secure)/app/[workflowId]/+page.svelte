<script lang="ts">
    import {page} from '$app/stores'

    $: console.log($page.params)
</script>

<header>
    <h1>Workflow {$page.params.workflowId}</h1>
</header>
