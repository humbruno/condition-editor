/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/condition-editor',
  plugins: [react()],
  build: {
    outDir: './build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      // you can include other reporters, but 'json-summary' is required, json is recommended
      reporter: ['text', 'json-summary', 'json'],
      provider: 'istanbul',
    },
  },
});
