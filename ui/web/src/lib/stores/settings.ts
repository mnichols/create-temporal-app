import {writable} from 'svelte/store'

export const themes = [
    'dark',
    'light',
]
export const settings = writable({
    theme: themes[0],
    apiRootUrl: '',
})