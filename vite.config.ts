import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// @ts-ignore
import { handleGeminiApiRequest } from './server/index.js';

function geminiProxyPlugin(): Plugin {
  const handler = async (req: any, res: any, next: any) => {
    if (req.url && req.url.startsWith('/api/gemini')) {
      try {
        const handled = await handleGeminiApiRequest(req, res);
        if (handled) return;

        // If the path was not handled by handleGeminiApiRequest, return 404 JSON.
        // NEVER call next() for /api/gemini requests, as Vite's SPA fallback would return index.html (<!doctype html>).
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: `Endpoint not found: ${req.url}` }));
        return;
      } catch (err: any) {
        console.error('[Vite Gemini Proxy Error]:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: err.message || 'Internal server error' }));
        return;
      }
    }
    next();
  };

  return {
    name: 'gemini-proxy-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), geminiProxyPlugin()],
});
