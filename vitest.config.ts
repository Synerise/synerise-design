import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      'react-window': path.resolve(
        __dirname,
        './config/vitest/__mocks__/reactWindowMock.js',
      ),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, './config/vitest/setup.js')],
    include: ['src/**/*.{spec,test}.{ts,tsx}'],
  },
});
