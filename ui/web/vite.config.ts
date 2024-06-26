import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vitest/config';
import fs from 'fs'

import mkcert from 'vite-plugin-mkcert'
// https://github.com/sveltejs/kit/issues/11365
export default defineConfig({
    base: '/viteconfignotused',
    plugins: [mkcert(), sveltekit()],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    },
    resolve: {
        alias: {
            $lib: './src/lib',
        }
    },
    build: {
        sourcemap: true
    },
    optimizeDeps: {
        exclude: ['@urql/svelte']
    },
    server: {
        https: {
            key: fs.readFileSync(`../../localhost-key.pem`),
            cert: fs.readFileSync(`../../localhost.pem`)
        },
        //  without the proxy does NOT work.
        proxy: {}

    }
});
