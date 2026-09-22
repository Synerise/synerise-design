import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'path';
import { defineConfig } from 'vitest/config';

const monorepoRoot = path.resolve(__dirname, '../..');

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: path.resolve(__dirname, '.storybook'),
    }),
  ],
  server: {
    fs: {
      allow: [monorepoRoot],
    },
  },
  optimizeDeps: {
    include: [
      'storybook/actions',
      'storybook/test',
      'storybook-addon-mock-date',
      'react',
      'react-dom',
      'react-intl',
      'styled-components',
      'dayjs',
      'dayjs/**',
      'moment',
      'uuid',
      'copy-to-clipboard',
      'react-window',
      '@faker-js/faker',
      '@testing-library/react',
    ],
  },
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
