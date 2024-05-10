import {derived, get, type Readable, type Updater, type Writable, writable} from 'svelte/store'
import {type AppInfo, AppInfoDocument} from '$gql'
import type {Client} from '@urql/core'
import {getContextClient, queryStore} from '@urql/svelte'
import {getContext, setContext} from 'svelte'

const _contextKey = '$$_settings'

interface Settings {
    theme: string,
    temporal: {
        taskQueue?: string,
        namespace: string
    }
}

export interface SettingsStore extends Writable<Settings> {
}

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

export const getContextSettings = (): SettingsStore => {
    const out = getContext(_contextKey)

    return out as SettingsStore
}
export const setContextSettings = (settings: SettingsStore): SettingsStore => {
    setContext(_contextKey, settings)
    return settings
}
export const createSettings = (client: Client): SettingsStore => {
    const appInfo = queryStore({
        client: getContextClient(),
        query: AppInfoDocument,
    })
    const uiSettings = writable({
        theme: themes[0]
    })
    const appInfoStore = writable<AppInfo>({
        temporal: {
            namespace: '',
            taskQueue: '',
        }
    })
    appInfo.subscribe(val => {
        console.log('settingAppInfo', val.data?.appInfo?.temporal)
        appInfoStore.set({
            temporal: val?.data?.appInfo?.temporal
        })
    })
    let store: Readable<Settings> = derived([uiSettings, appInfoStore], ([$ui, $appInfo], set) => {
        set({
            theme: $ui.theme,
            temporal: {
                taskQueue: $appInfo?.data?.appInfo?.temporal?.taskQueue,
                namespace: $appInfo?.data?.appInfo?.temporal?.namespace,
            }
        })
    })
    const set = (val: Settings) => {
        console.log('set operation', val.temporal)
        uiSettings.set({theme: val.theme})
        appInfoStore.set(val)
    }

    return {
        set,
        subscribe: store.subscribe,
        update(updater: Updater<Settings>): void {
            const data = updater(get(store))
            set(data)
        }

    }

}