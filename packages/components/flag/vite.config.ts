import { lessCompilePlugin } from '../../../scripts/vite/less-plugin';
import { preBuildPlugin } from '../../../scripts/vite/prebuild-plugin';
import { createViteConfig } from '../../../vite.config.base';

export default createViteConfig('@synerise/ds-flag', {
  plugins: [
    preBuildPlugin({
      script: './build/svgr.js',
      description: 'Generate flag components from SVG',
    }),
    lessCompilePlugin(),
  ],
});
