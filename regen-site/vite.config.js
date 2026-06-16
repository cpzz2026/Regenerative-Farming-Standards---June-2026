import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' uses relative asset paths, so the same build works whether the
// site is served from a domain root (Vercel / Netlify) or from a GitHub Pages
// project subpath (https://<user>.github.io/<repo>/). No edit needed per host.
export default defineConfig({
  plugins: [react()],
  base: './',
})
