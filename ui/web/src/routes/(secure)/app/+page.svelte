<script lang='ts'>
    function executeWorkflow(e) {
        const formData = new FormData(e.target);
        const data = {};
        console.log('form', data)
    }
</script>

<form on:submit|preventDefault={executeWorkflow}>
    <label for='workflow-value'>
        <span>Value</span>
        <input type='text' name='workflow-value' placeholder='Type here' class='input w-full max-w-xs'/>
    </label>
    <button type='submit' class='btn accent-green-200'>Start Workflow</button>
</form>
