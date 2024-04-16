<script lang="ts">
    import '../app.css'
    import {createSettings} from '$lib/stores/settings'
    import {setContextClient} from "@urql/svelte";
    import {createClient} from '$lib/http/urql'

    const client = createClient()
    setContextClient(client)
    const settings = createSettings(client)
    settings.subscribe(val => {
        console.log('settings changes', val)
        // const client = createClient()
        // setContextClient(client)
    })
    // import {createUserStore, goLogin, setContextUser} from "$lib/stores/auth-user";

    const temporalLogoUrl = new URL('../static/temporal-logo.png', import.meta.url).href

</script>


<div data-theme={$settings.theme} class='h-screen w-screen'>
    <slot/>
</div>