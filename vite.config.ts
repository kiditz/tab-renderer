import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vuetify from 'vite-plugin-vuetify'
// import * as alphaTab from '@coderline/alphatab'
export default defineConfig({
  plugins: [ vue(),vuetify()],
  optimizeDeps: {
    exclude: ["@coderline/alphatab"]
  }

})
