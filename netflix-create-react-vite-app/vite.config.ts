/// <reference types="vite/client"/>
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [devtools(), react()],
    server: {
        open: true,
    },
});
