import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))
const testSetupFile = fileURLToPath(new URL('./src/test/setup.js', import.meta.url))

export default defineConfig({
  root: projectRoot,
  base: './',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: testSetupFile,
  },
})
