import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base is '/edition-2026/' for cPanel deployment in a subdirectory
export default defineConfig({
  plugins: [react()],
  base: '/edition-2026/',
})
