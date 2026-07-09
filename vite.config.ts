import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify — file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    // Project preview iframes point at real production URLs; without this,
    // happy-dom actually fetches them when a test mounts one, making the
    // suite's speed and outcome depend on live third-party hosts.
    environmentOptions: {
      happyDOM: {
        settings: { disableIframePageLoading: true },
      },
    },
    setupFiles: ['./tests/setup.ts'],
    css: false,
  },
});
