import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base is '/' for root domain deployment
export default defineConfig({
  plugins: [react()],
  base: '/',
})
