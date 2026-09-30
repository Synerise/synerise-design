import type { KnipConfig } from 'knip';

// `knip:ci` runs after `pnpm build` and makes two passes. The second, `--production --strict`,
// checks each published package against its own manifest instead of falling back to the root one:
// a runtime import that only resolves through the root package.json works here and breaks in every
// consuming app. A built dist/ is reached through each package's main/types, so that pass also
// covers what is actually published, d.ts files included.
const isProduction = process.argv.includes('--production');

// Test and story sources are never built (see findInputFiles() in vite.config.base.ts), but the
// "./dist/*" export maps every src file to an entry, so the production pass drops them explicitly.
const NON_PRODUCTION = [
  '**/*.{spec,test}.{ts,tsx}',
  '**/*.stories.tsx',
  '**/{stories,__tests__,__specs__,__spec__,__mocks__}/**',
  '**/modules.d.ts',
];

// Every published d.ts imports these, but they type the `react` and `styled-components` peers, so
// they come with the consumer's own install. Set per workspace: the strict pass filters out the
// root workspace, and with it the top-level ignore list.
const PEER_TYPES = isProduction
  ? ['@types/react', '@types/styled-components']
  : [];

// Every non-test src file is built to its own dist file and is public through the "./dist/*"
// export, so each one is an entry: its exports are API even when nothing in the repo imports them.
const component = ({
  entry = [] as string[],
  project = [] as string[],
  ignoreDependencies = [] as (string | RegExp)[],
} = {}) => ({
  entry: ['src/**/*.{ts,tsx}!', ...entry],
  project: ['src/**/*.{ts,tsx}', ...project],
  ignoreDependencies: [...PEER_TYPES, ...ignoreDependencies],
});

const config: KnipConfig = {
  ignore: [
    // Code Connect sources: `@ts-nocheck`, never built or published, and read by the figma CLI
    // from the workspace. Listing what they import would add cycles (checkbox <-> skeleton).
    '**/*.figma.tsx',
    ...(isProduction ? NON_PRODUCTION : []),
  ],
  ignoreDependencies: [
    // Loaded by name: a babel plugin in vite.config.base.ts, svgr plugins in */build/svgr.js
    'babel-plugin-styled-components',
    '@svgr/plugin-jsx',
    '@svgr/plugin-svgo',
  ],
  ignoreIssues: {
    // `export const X` next to `export default X` is how components expose both import styles
    'packages/components/*/src/**': ['duplicates'],
  },
  workspaces: {
    '.': {
      entry: [
        'vite.config.base.ts',
        'config/vitest/setup.ts',
        'scripts/**/*.{js,cjs,mjs,ts}',
      ],
      project: ['scripts/**', 'config/**'],
      ignore: ['scripts/create-component/package-template/**'],
    },
    'packages/components/*': component(),
    'packages/components/core': component({
      entry: ['build/*.js'],
      project: ['build/*.js'],
      // Optional peers, imported only by the `./testing` entry that consumers opt into
      ignoreDependencies: ['@testing-library/react', 'vitest'],
    }),
    'packages/components/design-system': component({
      // Meta-package: installing it installs every component, so its dependencies are the product
      ignoreDependencies: [/^@synerise\//],
    }),
    'packages/storybook': {
      entry: ['addon-code-panel/*.{ts,tsx}'],
    },
  },
};

export default config;
