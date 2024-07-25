<script lang='ts'>
    import {getContextClient, mutationStore} from '@urql/svelte'
    import cuid from '@paralleldrive/cuid2'
    import {humanId} from 'human-id'
    import {ExecuteWorkflowDocument} from '$gql'

    const ids = cuid.init({length: 5});
    let defaultId = humanId({capitalize: false, separator: '-'})
    const getFormJSON = (formData) => {
        return Array.from(formData.keys()).reduce((result, key) => {
            result[key] = formData.get(key);
            return result;
        }, {});
    };

    function executeWorkflow(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        const inputs = getFormJSON(formData)
        const client = getContextClient()
        console.log('inputs', inputs)
        if (formData.get('workflow-value')) {
            let out = mutationStore({
                client,
                query: ExecuteWorkflowDocument,
                variables: {
                    input: {
                        id: inputs.id,
                        value: inputs['workflow-value'],
                    },
                }
            })
        }
    }
</script>

<form on:submit|preventDefault={executeWorkflow} class='flex flex-col'>
    <label for='id' class='label'>
        <span class='label-text'>ID</span>
        <input type='text' name='id' placeholder='Enter id here' required
               class='input w-full max-w-xs'
               value={defaultId}/>
    </label>
    <label for='workflow-value' class='label'>
        <span class='label-text'>Value</span>
        <input type='text' name='workflow-value' placeholder='Enter value here' required class='input w-full max-w-xs'/>
    </label>

    <button type='submit' class='btn accent-green-200'>Start Workflow</button>
</form>
