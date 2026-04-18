import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    /**
     * Proxy /api to port 3000 where `vercel dev` runs.
     * Run `vercel dev` (not `npm run dev`) for full LLM functionality locally.
     * If only `npm run dev` is used, the assistant falls back to local keyword matching.
     */
    proxy: {
      '/api': {
        target:       'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
