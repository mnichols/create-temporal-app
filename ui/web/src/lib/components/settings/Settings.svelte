<script lang="ts">

    import {settings, themes} from '$lib/stores/settings.js'

    function setTheme(e) {
        $settings.theme = e.currentTarget.value
    }

    function setApiRootUrl(e) {
        $settings.apiRootUrl = e.currentTarget.value
    }

    function setNamespace(e) {
        $settings.temporalOptions.namespace = e.currentTarget.value
    }

    function setTaskQueue(e) {
        $settings.temporalOptions.taskQueue = e.currentTarget.value
    }

</script>
<header class='mb-6 text-5xl font-bold'>
    <h1>Settings</h1>
</header>

<div>
    <div class='card w-96 bg-primary text-primary-content'>
        <h3 class='card-title'>Theme</h3>
        <div class='card-body'>


            <div class='form-control'>
                <div class='dropdown mb-72'>
                    <div tabindex="0" role="button" class="btn m-1">
                        Theme
                        <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                        </svg>
                    </div>
                    <ul tabindex='0' class='dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52'>
                        {#each themes as theme}
                            <li>
                                <input type='radio'
                                       name='theme-dropdown'
                                       class='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                                       aria-label={theme}
                                       value={theme}
                                       checked={theme==$settings.theme}
                                       on:change={setTheme}
                                />
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
            <!--&lt;!&ndash;&lt;!&ndash;                        <label class="label cursor-pointer">&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;                            <span class="label-text">{theme}</span>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;                            <input type="radio" name="selected-theme" class="radio checked:bg-red-500"&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;                                   on:change={setTheme}&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;                                   value={theme} checked={$settings.theme===theme}/>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;                        </label>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;                    </div>&ndash;&gt;-->
            <!--                {/each}-->
            <!--            </select>-->
        </div>
    </div>
    <div class="card w-96 bg-primary text-primary-content">
        <h3 class='card-title'>API</h3>
        <div class='card-body'>
            <div class="form-control">
                <label class="label cursor-pointer">
                    <span class="label-text">API Root Url</span>
                    <input type='text' name='api-root' class='input' on:input={setApiRootUrl}
                           value={$settings.apiRootUrl}/>
                </label>
            </div>
        </div>
    </div>
    <div class="card w-96 bg-primary text-primary-content">
        <h3 class='card-title'>Temporal Global Options</h3>
        <div class='card-body'>
            <div class="form-control">
                <label class="label cursor-pointer">
                    <span class="label-text">Namespace</span>
                    <input type='text' name='api-root' class='input' on:input={setNamespace}
                           value={$settings.temporalOptions.namespace}/>
                </label>
                <label class="label cursor-pointer">
                    <span class="label-text">Task Queue</span>
                    <input type='text' name='api-root' class='input' on:input={setTaskQueue}
                           value={$settings.temporalOptions.taskQueue}/>
                </label>
            </div>
        </div>
    </div>

</div>
<h3>HTTP</h3>
