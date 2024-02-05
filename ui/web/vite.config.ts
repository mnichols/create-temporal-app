import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vitest/config';
import path from 'path'
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
            $lib: path.resolve(__dirname, './src/lib'),
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
            // key: fs.readFileSync(`${__dirname}/cert/key.pem`),
            // cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
            key: fs.readFileSync(`/Users/mnichols/certs/temporal-shop-prod.sdvdw.key`),
            cert: fs.readFileSync(`/Users/mnichols/certs/temporal-shop-prod.sdvdw.pem`)
        },
        //  without the proxy does NOT work.
        proxy: {}

    }
});
