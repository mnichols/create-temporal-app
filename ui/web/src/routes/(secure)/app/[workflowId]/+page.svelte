<script lang="ts">
    import {page} from '$app/stores'
    import {getContextClient, queryStore} from '@urql/svelte'
    import {QueryWorkflowDocument} from '$gql'

    const state = queryStore({
        client: getContextClient(),
        query: QueryWorkflowDocument,
        variables: {
            input: {
                id: $page.params.workflowId,
                value: 'f'
            }
        }
    })
</script>

<header>
    <h1>Workflow {$page.params.workflowId}</h1>
    {#if $state?.data?.queryWorkflow}
        <p>{$state.data.queryWorkflow.value}</p>
    {/if}
</header>
