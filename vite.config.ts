import { createRequire } from 'module'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    watch: {
      ignored: ['**/src/examples/**'],
    }
  },
  optimizeDeps: {
    exclude: ['src/examples', 'src/examples/*']
  },
  plugins: [
    preact({
      babel: {
        // Change cwd to load Preact Babel plugins
        cwd: createRequire(import.meta.url).resolve('@preact/preset-vite')
      }
    })
  ]
})
