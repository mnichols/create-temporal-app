<script>
    import HolyGrail from "$lib/components/layouts/HolyGrail.svelte";
</script>

<HolyGrail>
    <div slot='header'>
        <h1>My Application</h1>
    </div>
    <div slot='left-col'></div>

    <div slot='main'>
        <slot/>
    </div>
    <div slot='footer'>
    </div>
</HolyGrail>
