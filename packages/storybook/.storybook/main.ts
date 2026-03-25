import NpmImportPlugin from 'less-plugin-npm-import';
import { dirname, join, resolve } from 'path';
import deeperSortSetup from 'storybook-deeper-sort';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

import type { StorybookConfig } from '@storybook/react-vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

deeperSortSetup(['Introduction', 'Tokens', 'Components', ['*', 'Tests']], {
  docsFirst: false,
});

function getAbsolutePath(value: string): string {
  const resolved = import.meta.resolve?.(join(value, 'package.json'));
  if (!resolved) {
    throw new Error(`Could not resolve ${value}`);
  }
  return dirname(fileURLToPath(resolved));
}

/**
 * Vite plugin that replaces the old webpack transform-rename-import babel plugin.
 * Rewrites @synerise/ds-<name> and @synerise/ds-<name>/dist/... imports
 * to packages/components/<name>/src/... for all packages except core, icon, avatar.
 */
function dsSourceRedirectPlugin(): Plugin {
  const EXCLUDED = /^(core|icon|avatar)$/;
  const DS_PATTERN = /^@synerise\/ds-([a-z0-9-]+)(\/dist)?(\/.*)?$/;
  const componentsDir = resolve(__dirname, '../../../packages/components');

  return {
    name: 'ds-source-redirect',
    enforce: 'pre',
    async resolveId(source, importer) {
      const match = DS_PATTERN.exec(source);
      if (!match) return null;
      const [, pkgName, , rest = ''] = match;
      if (EXCLUDED.test(pkgName)) return null;
      // Resolve from the component's own directory so its dependencies are found
      const pkgDir = resolve(componentsDir, pkgName);
      const resolved = await this.resolve(
        resolve(pkgDir, 'src' + rest),
        importer,
        { skipSelf: true },
      );
      return resolved;
    },
  };
}

/**
 * Vite plugin that resolves bare imports from component sources
 * by checking each component's own node_modules (pnpm strict mode).
 */
function componentDepsPlugin(): Plugin {
  const componentsDir = resolve(__dirname, '../../../packages/components');

  return {
    name: 'component-deps-resolver',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!importer || source.startsWith('.') || source.startsWith('/')) {
        return null;
      }
      if (!importer.includes('/packages/components/')) return null;

      const match = importer.match(/\/packages\/components\/([^/]+)\//);
      if (!match) return null;

      try {
        return await this.resolve(
          source,
          resolve(componentsDir, match[1], 'package.json'),
          { skipSelf: true },
        );
      } catch {
        return null;
      }
    },
  };
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('storybook-addon-tag-badges'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('storybook-addon-pseudo-states'),
    getAbsolutePath('@storybook/addon-designs'),
    getAbsolutePath('@storybook/addon-mcp'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  tags: {
    visualtests: { defaultFilterSelection: 'exclude' },
    internal: { defaultFilterSelection: 'exclude' },
  },
  docs: {
    defaultName: 'Overview',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: '../../config/typescript/tsconfig.base.json',
      propFilter: (prop: any) => {
        const res = !/@types\/react/.test(prop.parent?.fileName);
        return prop.parent ? res : true;
      },
      shouldExtractLiteralValuesFromEnum: true,
      savePropValueAsString: true,
    },
    check: false,
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const monorepoRoot = resolve(__dirname, '../../..');
    return mergeConfig(config, {
      plugins: [dsSourceRedirectPlugin(), componentDepsPlugin()],
      server: {
        fs: {
          allow: [monorepoRoot],
        },
      },
      resolve: {
        dedupe: ['styled-components', 'react', 'react-dom'],
        alias: {
          '@use-it/interval': '@use-it/interval/dist/interval.esm.js',
          'highlight.js': resolve(
            __dirname,
            '../../../packages/components/code-snippet/node_modules/highlight.js',
          ),
        },
      },
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
            plugins: [new NpmImportPlugin({ prefix: '~' })],
          },
        },
      },
    });
  },
};
export default config;
