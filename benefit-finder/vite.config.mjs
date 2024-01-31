import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import copy from 'rollup-plugin-copy'

const env = loadEnv('all', process.cwd())
const proxyURL = env.VITE_PROXY_URL

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    eslint(),
    copy({
      targets: [
        {
          src: ['src/*', '!src/setupTests.js'],
          dest: 'dist',
          expandDirectories: true,
          onlyFiles: true,
        },
        {
          src: ['package.json', 'package-lock.json'],
          dest: 'dist',
          expandDirectories: true,
          onlyFiles: true,
        },
        {
          src: ['src/App/*', '!src/App/*.stories.jsx'],
          dest: 'dist/src',
          expandDirectories: true,
          onlyFiles: true,
        },
        {
          src: 'src/shared/api/*',
          dest: 'dist/src/',
          expandDirectories: true,
          onlyFiles: true,
        },
        {
          src: 'src/shared/locales',
          dest: 'dist/src/',
        },
        {
          src: [
            'src/shared/hooks/*',
            'src/shared/hooks/**/*',
            '!src/shared/hooks/**/**/__tests__',
          ],
          dest: 'dist/src/',
          expandDirectories: true,
          onlyFiles: true,
        },
        {
          src: 'src/shared/styles',
          dest: 'dist/src/',
        },
        {
          src: [
            'src/shared/utils/*',
            'src/shared/utils/**/*',
            '!src/shared/utils/**/**/__tests__',
          ],
          dest: 'dist/src/',
          expandDirectories: true,
          onlyFiles: true,
        },
        {
          src: [
            'src/shared/components/*',
            'src/shared/components/**/*',
            '!src/shared/components/**/**/__tests__',
            '!src/shared/components/**/index.stories.jsx',
          ],
          dest: 'dist/src/',
          expandDirectories: true,
          onlyFiles: true,
        },
      ],
      flatten: false,
      hook: 'writeBundle',
    }),
  ],
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
      reportsDirectory: '../coverage',
      reporter: ['text', 'json'],
      thresholds: {
        branches: 80,
        functions: 55,
        lines: 80,
        statements: 80,
      },
      include: ['**/*.{js,jsx}'],
      exclude: [
        'node_modules/',
        'setupTests.ts',
        'jest-test-results.json',
        '**/*.stories.jsx',
        '**/*.cy.jsx',
        '<rootDir>/node_modules/',
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
