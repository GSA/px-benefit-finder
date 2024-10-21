import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import sassEmbedded from 'sass-embedded'
import eslint from 'vite-plugin-eslint'
import copy from 'rollup-plugin-copy'
import { distTargets, testConfig, transformers } from './vite-config'

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

const poscssConfig = {
  plugins: [
    transformers.prependID({
      id: 'benefit-finder',
      ignoreID: '#benefit-finder-modal',
    }),
  ],
}

const server = test ? testServer : devServer

const INPUT_DIR = './src'

const aliasConfig = {
  '@': path.resolve(INPUT_DIR),
  '@api': path.resolve(INPUT_DIR, './shared/api'),
  '@routes': path.resolve(INPUT_DIR, './Routes'),
  '@components': path.resolve(INPUT_DIR, './shared/components'),
  '@hooks': path.resolve(INPUT_DIR, './shared/hooks'),
  '@locales': path.resolve(INPUT_DIR, './shared/locales'),
  '@styles': path.resolve(INPUT_DIR, './shared/styles'),
  '@utils': path.resolve(INPUT_DIR, './shared/utils'),
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), eslint(), copy(copyConfig)],
  resolve: {
    alias: aliasConfig,
  },
  optimizeDeps: {
    exclude: ['@storybook/blocks'],
    include: ['jsdoc-type-pratt-parser'],
  },
  css: {
    postcss: poscssConfig,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        implementation: sassEmbedded,
      },
    },
  },
  server: { ...server },
  test: testConfig,
  build: {
    emptyOutDir: true,
    outDir: 'build',
    chunkSizeWarningLimit: '1000',
    rollupOptions: {
      output: {
        manualChunks: {},
        entryFileNames: `assets/benefit-finder.min.js`,
        assetFileNames: `assets/benefit-finder.min.[ext]`,
      },
    },
  },
})
