import { copyFilesPlugin } from '../../../scripts/vite/copy-plugin';
import { lessCompilePlugin } from '../../../scripts/vite/less-plugin';
import { preBuildPlugin } from '../../../scripts/vite/prebuild-plugin';
import { createViteConfig } from '../../../vite.config.base';

export default createViteConfig('@synerise/ds-core', {
  plugins: [
    // Generate theme variables from LESS into source before Vite transpiles
    preBuildPlugin({
      script: './build/vars.js',
      description: 'Generate theme variables',
    }),
    // Copy LESS and JSON files to dist
    copyFilesPlugin({
      patterns: ['**/*.less', '**/*.json'],
    }),
    // Compile LESS to CSS (also injects CSS imports into dist JS files)
    lessCompilePlugin(),
  ],
  // Core source is in src/js/ — base config globs all src/**/*.ts files
  // and preserveModulesRoot: 'src' ensures output is dist/js/...
});
