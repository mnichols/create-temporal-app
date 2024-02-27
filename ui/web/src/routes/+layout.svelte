<script>
    import '../app.css'
    import {settings} from '$lib/stores/settings'
    import {setContextClient} from "@urql/svelte";
    import {createClient} from '$lib/http/urql'

    settings.subscribe(val => {
        console.log('settings changes', val)
        // const client = createClient()
        // setContextClient(client)
    })
    // import {createUserStore, goLogin, setContextUser} from "$lib/stores/auth-user";
    const client = createClient()
    setContextClient(client)
    const temporalLogoUrl = new URL('../static/temporal_logo.png', import.meta.url).href

</script>


<div data-theme={$settings.theme} class='h-screen w-screen'>
    <slot/>
</div>