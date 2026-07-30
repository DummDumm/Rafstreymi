import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // If deploying to https://<username>.github.io/<repo-name>/,
  // set base to '/<repo-name>/'. If this repo IS your username.github.io
  // repo (i.e. served at the root), leave base as '/'.
  base: '/Rafstreymi/',
})
