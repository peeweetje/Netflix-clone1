/// <reference types="vite/client"/>
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import stylex from '@stylexjs/unplugin';
// https://vitejs.dev/config/
export default defineConfig({
        plugins: [
            stylex.vite({ useCSSLayers: true }),
            devtools(),
            react(),
        ],
    server: {
        open: true,
    },
});
