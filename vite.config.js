import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base is '/' for Vercel (deployed at root, not a GitHub Pages subdirectory)
export default defineConfig({
  plugins: [react()],
  base: '/edition-2026/',
})
