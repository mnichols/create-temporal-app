<script lang="ts">
    import HolyGrail from "$lib/components/layouts/HolyGrail.svelte"
    import temporalCloud from '$lib/images/temporal-cloud.png'

    import {getContextSettings} from "$lib/stores/settings.js";

    const settings = getContextSettings()
    settings.subscribe(s => {
        console.log('temporal value', s.temporal)
    })
</script>

<HolyGrail>
    <div slot='header'>
        <div class="corner">
            <a href="https://cloud.temporal.io/namespaces/{$settings.temporal.namespace}" target="_blank">
                <img src={temporalCloud} alt="Temporal Cloud"/>
            </a>
        </div>
        <h1>My Application</h1>
    </div>
    <div slot='left-col'></div>

    <div slot='main'>
        <slot/>
    </div>
    <div slot='footer'>
    </div>
</HolyGrail>
