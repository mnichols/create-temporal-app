<script lang="ts">

    import {settings} from '$lib/stores/settings.js'
</script>

<dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
    <div class="flex flex-col pb-3">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">API Root URL</dt>
        <dd class="text-lg font-semibold">{$settings.apiRootUrl}</dd>
    </div>
    <div class="flex flex-col py-3">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Namespace</dt>
        <dd class="text-lg font-semibold">{$settings.temporalOptions.namespace}</dd>
    </div>
    <div class="flex flex-col pt-3">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Task Queue</dt>
        <dd class="text-lg font-semibold">{$settings.temporalOptions.taskQueue}</dd>
    </div>
</dl>