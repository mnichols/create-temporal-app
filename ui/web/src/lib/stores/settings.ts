import {writable} from 'svelte/store'

export const themes = [
    'light',
    'dark',
    'corporate',
    'business',
    'cupcake',
    'bumblebee',
    'emerald',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
]
export const settings = writable({
    theme: themes[0],
    apiRootUrl: '',
    temporalOptions: {
        taskQueue: '',
        namespace: '',
    }
})