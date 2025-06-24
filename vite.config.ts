import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import styleX from '@stylexjs/babel-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            styleX, 
            {
              dev: true,
              runtimeInjection: true,
              genConditionalClasses: true,
            }
          ]
        ]
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  }
})