import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.spec.ts'],
    setupFiles: ['./vitest.setup.mts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.spec.ts',
        'src/**/index.ts',
        'src/__mocks__/**',
        'src/test-tokens.ts'
      ],
      thresholds: {
        branches: 70,
        functions: 60,
        lines: 65,
        statements: 70
      }
    }
  }
});
