/// <reference types="vitest/config" />
import { globSync } from 'glob';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { type Plugin, type UserConfig, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import react from '@vitejs/plugin-react';

import { stubLessImportsPlugin } from './scripts/vite/stub-less-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface ViteConfigOptions {
  /** Additional plugins to include */
  plugins?: Plugin[];
  /** Custom external dependencies (merged with defaults) */
  external?: (string | RegExp)[];
  /** Override default config */
  configOverride?: Partial<UserConfig>;
}

/**
 * Creates a Vite configuration for building a design system package.
 * Outputs individual ESM files (not bundled) to maintain backward compatibility.
 *
 * @param packageName - The package name (e.g., '@synerise/ds-button')
 * @param options - Configuration options
 */
export const createViteConfig = (
  packageName: string,
  options: ViteConfigOptions = {},
) => {
  const { plugins = [], external = [], configOverride = {} } = options;

  // Default external dependencies - these won't be bundled
  const defaultExternal = [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react-is',
    'prop-types',
    /^@synerise\/ds-/, // All design system packages
    'styled-components',
    'antd',
    /^antd\//, // Antd sub-imports
    /^lodash/,
    /^ramda/,
    '@floating-ui/react',
    '@floating-ui/react-dom',
    'date-fns',
    /^date-fns\//,
    'date-fns-tz',
    'react-intl',
    /^react-intl\//,
    'uuid',
    'flat',
    'color',
    'highlight.js',
    'tinycolor2',
    'fuse.js',
    'react-window',
    'nanoid',
    'classnames',
    /^rc-/, // All rc-* packages
    'react-scrollbars-custom',
    'react-perfect-scrollbar',
    'moment',
    'dayjs',
    'deepmerge',
    'react-hot-toast',
    '@testing-library/react',
    '@testing-library/dom',
    /^@testing-library\//,
    /^@formatjs\//,
    /^@ant-design\//,
  ];

  const allExternal = [...defaultExternal, ...external];

  const cwd = process.cwd();

  // Discover all source files as entry points to maintain 1:1 src→dist mapping.
  // This is needed because packages use deep imports (e.g., ds-date-picker/dist/fns).
  const findInputFiles = () => {
    const files = globSync('src/**/*.{ts,tsx}', {
      cwd,
      ignore: [
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.stories.tsx',
        '**/stories/**',
        '**/__tests__/**',
        '**/__specs__/**',
        '**/__mocks__/**',
      ],
    });
    return Object.fromEntries(
      files.map((f) => [
        f.replace(/^src\//, '').replace(/\.(ts|tsx)$/, ''),
        resolve(cwd, f),
      ]),
    );
  };

  const isExternal = (id: string) =>
    allExternal.some((pattern) =>
      typeof pattern === 'string'
        ? id === pattern || id.startsWith(pattern + '/')
        : pattern.test(id),
    );

  // Rollup plugin that marks bare imports as external before Vite resolves them
  // to absolute node_modules paths. Without this, unlisted deps get resolved to
  // absolute paths (/builds/.../node_modules/...) which aren't portable.
  const externalizeDepPlugin = (): Plugin => ({
    name: 'externalize-deps',
    enforce: 'pre',
    apply: 'build',
    resolveId(source) {
      // Skip relative, absolute, and virtual module imports
      if (
        source.startsWith('.') ||
        source.startsWith('/') ||
        source.startsWith('\0')
      ) {
        return null;
      }
      // All bare specifiers are dependencies — mark external before Vite resolves them
      return { id: source, external: true };
    },
  });

  // External function for rollupOptions — catches any remaining resolved paths
  const externalFn = (id: string) => {
    if (id.includes('node_modules')) {
      return true;
    }
    return isExternal(id);
  };

  // Base rollupOptions — use all source files as inputs for 1:1 mapping
  const baseRollupOptions = {
    input: findInputFiles(),
    external: externalFn,
    preserveEntrySignatures: 'strict' as const,
    output: {
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js',
      format: 'es' as const,
      dir: 'dist',
      interop: 'auto' as const,
      exports: 'named' as const,
    },
  };

  // Merge rollupOptions from configOverride if provided
  const rollupOptions = {
    ...baseRollupOptions,
    ...(configOverride.build?.rollupOptions || {}),
    // Always preserve input and external from base
    input:
      configOverride.build?.rollupOptions?.input || baseRollupOptions.input,
    external: externalFn,
    output: {
      ...baseRollupOptions.output,
      ...(configOverride.build?.rollupOptions?.output || {}),
    },
  };

  return defineConfig({
    plugins: [
      // Mark bare imports as external before Vite resolves them to absolute paths
      externalizeDepPlugin(),
      // Stub LESS imports (we compile them separately)
      stubLessImportsPlugin(),
      // React plugin with styled-components support
      react({
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                displayName: true,
                fileName: true,
                ssr: true,
                pure: true,
              },
            ],
          ],
        },
      }),
      // TypeScript declaration files
      dts({
        insertTypesEntry: false, // Don't modify package.json
        copyDtsFiles: true,
        outDir: 'dist',
        include: ['src/**/*'],
        exclude: [
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.stories.tsx',
          '**/stories/**',
          '**/__tests__/**',
          '**/__mocks__/**',
        ],
        compilerOptions: {
          declarationMap: false,
          sourceMap: false,
          paths: {},
        },
      }),
      // Add custom plugins from options
      ...plugins,
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // Enable npm imports with ~ prefix
          modifyVars: {},
          // Use current process directory for node_modules resolution
          paths: [resolve(process.cwd(), 'node_modules')],
        },
      },
      // Don't inject CSS into JS - we'll handle CSS separately
      modules: {
        localsConvention: 'camelCase',
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      // Don't minify to maintain readability
      minify: false,
      sourcemap: false,
      rollupOptions,
      // Allow for large module warnings (design system has complex components)
      chunkSizeWarningLimit: 1000,
      ...(configOverride.build || {}),
    },
    resolve: {
      alias: {
        // Handle .jsx imports (transform to .js)
        '.jsx': '.js',
        // Mock react-window in tests
        'react-window': resolve(
          __dirname,
          './config/vitest/__mocks__/reactWindowMock.js',
        ),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      // Deduplicate packages that must be singletons (shared context)
      dedupe: ['styled-components', 'react', 'react-dom'],
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['@synerise/ds-*'],
    },
    // Vitest configuration
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [resolve(__dirname, './config/vitest/setup.ts')],
      include: ['src/**/*.{spec,test}.{ts,tsx}'],
    },
    // Spread remaining config overrides (except build which we handle above)
    ...Object.fromEntries(
      Object.entries(configOverride).filter(([key]) => key !== 'build'),
    ),
  });
};

export default createViteConfig;
