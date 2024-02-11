import {writable} from 'svelte/store'

export const themes = [
    'light',
    'dark',
    'corporate',
    'business',
    'wireframe',
    'cmyk',
    'coffee',
    'winter',
    // 'cupcake',
    // 'bumblebee',
    // 'emerald',
    // 'synthwave',
    // 'retro',
    // 'cyberpunk',
    // 'valentine',
    // 'halloween',
    // 'garden',
    // 'forest',
    // 'aqua',
    // 'lofi',
    // 'pastel',
    // 'fantasy',
    // 'black',
    // 'luxury',
    // 'dracula',
    // 'autumn',
    // 'acid',
    // 'lemonade',
    // 'night',
    // 'dim',
    // 'nord',
    // 'sunset',
]
export const settings = writable({
    theme: themes[0],
    apiRootUrl: '',
    temporalOptions: {
        taskQueue: '',
        namespace: '',
    }
})

settings.subscribe((value) => console.debug(JSON.stringify(value)))