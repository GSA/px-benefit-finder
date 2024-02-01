import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import copy from 'rollup-plugin-copy'
import { distTargets, testConfig } from './vite-config'

const envLocal = loadEnv('all', process.cwd())
const proxyURL = envLocal.VITE_PROXY_URL
const test = process.env.NODE_ENV === 'test'
const testServer = { port: 6006 }
const devServer = {
  port: 3000,
  open: '/death',
  proxy: {
    '/s3': {
      target: proxyURL,
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  },
}
const copyConfig = test
  ? {}
  : {
      targets: distTargets,
      flatten: false,
      hook: 'writeBundle',
    }

const server = test ? testServer : devServer

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), eslint(), copy(copyConfig)],
  server: { ...server },
  test: testConfig,
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {},
        entryFileNames: `assets/benefit-finder.min.js`,
        assetFileNames: `assets/benefit-finder.min.[ext]`,
      },
    },
  },
})
