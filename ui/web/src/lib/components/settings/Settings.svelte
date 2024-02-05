<script lang="ts">

    import {settings, themes} from '$lib/stores/settings.js'

    function setTheme(e) {
        $settings.theme = e.currentTarget.value
    }

    function setApiRootUrl(e) {
        $settings.apiRootUrl = e.currentTarget.value
    }

</script>
<header class='mb-6 text-5xl font-bold'>
    <h1>Settings</h1>
</header>

<div>
    <div class="card w-96 bg-primary text-primary-content">
        <h3 class='card-title'>Theme</h3>
        <div class='card-body'>
            {#each themes as theme}
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">{theme}</span>
                        <input type="radio" name="selected-theme" class="radio checked:bg-red-500" on:change={setTheme}
                               value={theme} checked={$settings.theme===theme}/>
                    </label>
                </div>
            {/each}
        </div>
    </div>
    <div class="card w-96 bg-primary text-primary-content">
        <h3 class='card-title'>API</h3>
        <div class='card-body'>
            <div class="form-control">
                <label class="label cursor-pointer">
                    <span class="label-text">API Root Url</span>
                    <input type='text' name='api-root' class='input' on:change={setApiRootUrl}
                           value={$settings.apiRootUrl}/>
                </label>
            </div>
        </div>
    </div>
</div>
<h3>HTTP</h3>
