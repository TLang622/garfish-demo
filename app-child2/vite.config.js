import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'http://localhost:3003/',
  server: {
    port: 3003,
    cors: true,
    origin: 'http://localhost:3003',
  }
})
