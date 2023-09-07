import './src/env.mjs'

import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    environment: 'happy-dom',
    globals: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
