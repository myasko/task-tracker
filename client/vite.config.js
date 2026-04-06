import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173 // Set the development server port to 3000
  },
  plugins: [react()],
})
