import { copyFilesPlugin } from '../../../scripts/vite/copy-plugin';
import { createViteConfig } from '../../../vite.config.base';

export default createViteConfig('@synerise/ds-core', {
  plugins: [
    copyFilesPlugin({
      patterns: ['**/*.json'],
    }),
  ],
  // Core source is in src/js/ — base config globs all src/**/*.ts files
  // and preserveModulesRoot: 'src' ensures output is dist/js/...
});
