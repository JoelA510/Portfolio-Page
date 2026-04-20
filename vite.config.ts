import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, Plugin} from 'vite';

// Mounts the same handler used by the Vercel serverless function as Vite
// middleware during `npm run dev`, so `fetch('/api/chat')` works locally
// without `vercel dev` installed.
function devApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'dev-api-chat',
    apply: 'serve',
    async configureServer(server) {
      // Forward known secrets into process.env for the dev handler.
      if (env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY) {
        process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
      }
      if (env.USE_FIRESTORE && !process.env.USE_FIRESTORE) {
        process.env.USE_FIRESTORE = env.USE_FIRESTORE;
      }
      const {handleChat} = await import('./api/_lib/handler');
      server.middlewares.use('/api/chat', (req, res) => {
        void handleChat(req, res);
      });
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), devApiPlugin(env)],
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
  };
});
