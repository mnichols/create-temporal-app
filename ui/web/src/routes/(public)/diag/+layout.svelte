<script>
    import HolyGrail from "$lib/components/layouts/HolyGrail.svelte";
    import {settings} from "$lib/stores/settings";
</script>

<HolyGrail>
    <div slot='header'>
        <h1>public layout. current theme is {$settings.theme}</h1>
    </div>
    <div slot='left-col'></div>

    <div slot='main'>
        <slot/>
    </div>
    <div slot='footer'>
    </div>
</HolyGrail>
