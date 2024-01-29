import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const env = loadEnv('all', process.cwd())
const proxyURL = env.VITE_PROXY_URL

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
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
  },
  test: {
    root: 'src',
    environment: 'jsdom',
    globals: true,
    setupFiles: 'setupTests.js',
    moduleNameMapper: {
      '@uswds/uswds/js/usa-accordion':
        '<rootDir>/node_modules/@uswds/uswds/packages/usa-accordion/src/index',
      '@uswds/uswds/js/usa-modal':
        '<rootDir>/node_modules/@uswds/uswds/packages/usa-modal/src/index',
    },
    include: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    exclude: ['**/__tests__/assets/*.spec.jsx'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      thresholds: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50,
      },
      include: ['**/*.{js,jsx}', ,],
      exclude: [
        'node_modules/',
        'setupTests.ts',
        'jest-test-results.json',
        '**/*.stories.jsx',
        '**/*.cy.jsx',
        '<rootDir>/node_modules/',
        '<rootDir>/jest-test-results.json',
        '**/hooks/index.js',
        '**/components/index.js',
        'reportWebVitals.js',
        'index.jsx',
        '**/assets/*',
        '**/utils/index.js',
      ],
    },
  },
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
