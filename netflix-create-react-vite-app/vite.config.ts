/// <reference types="vite/client"/>
/// <reference types= "vitest"/>

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [devtools(), react()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/setup.ts',
  },
});
