<script lang='ts'>

    import {settings, themes} from '$lib/stores/settings.js'
</script>
<header class='mb-6 text-5xl font-bold'>
    <h1>Settings</h1>
</header>

<div class='bg-neutral-content'>
    <div class='card w-96'>
        <h3 class='card-title text-neutral'>Theme</h3>
        <div class='card-body'>
            <div class='form-control'>
                <select class='select select-ghost w-full max-w-xs border-neutral' bind:value={$settings.theme}>
                    {#each themes as theme}
                        <option value={theme}>{theme}</option>
                    {/each}
                </select>

            </div>
        </div>
    </div>
    <div class='card w-96'>
        <h3 class='card-title text-neutral'>API</h3>
        <div class='card-body'>
            <div class='form-control'>
                <label class='label cursor-pointer'>
                    <span class='label-text'>API Root Url</span>
                    <input type='text' name='api-root' class='input' bind:value={$settings.apiRootUrl}/>
                </label>
            </div>
        </div>
    </div>
    <div class='card w-96'>
        <h3 class='card-title text-neutral'>Temporal Global Options</h3>
        <div class='card-body'>
            <div class='form-control'>
                <label class='label cursor-pointer'>
                    <span class='label-text'>Namespace</span>
                    <input type='text' name='api-root' class='input' bind:value={$settings.temporalOptions.namespace}/>
                </label>
                <label class='label cursor-pointer'>
                    <span class='label-text'>Task Queue</span>
                    <input type='text' name='api-root' class='input' bind:value={$settings.temporalOptions.taskQueue}/>
                </label>
            </div>
        </div>
    </div>
</div>
