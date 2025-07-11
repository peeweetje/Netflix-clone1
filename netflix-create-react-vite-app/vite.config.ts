/// <reference types="vite/client"/>
/// <reference types= "vitest"/>

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
