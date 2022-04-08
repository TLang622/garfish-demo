import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'http://localhost:3002/',
  server: {
    port: 3002,
    cors: true,
    origin: 'http://localhost:3002',
  }
})
