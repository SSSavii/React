/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Добавьте эту строку

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic' // Добавьте эту опцию
  })],
  resolve: {
    alias: {
      'redux-thunk': path.resolve(__dirname, './node_modules/redux-thunk')
    }
  }
})