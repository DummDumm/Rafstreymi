import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // GitHub Pages serves this repo at https://dummdumm.github.io/Rafstreymi/
  // Change to '/' if you later move to a custom domain or another host.
  base: '/Rafstreymi/',
})
