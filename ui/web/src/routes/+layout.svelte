<script>
    import '../app.css'
    import {settings} from '$lib/stores/settings'
</script>

<div data-theme={$settings.theme} class='h-screen w-screen'>
    <slot/>
</div>