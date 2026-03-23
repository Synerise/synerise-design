import { lessCompilePlugin } from '../../../scripts/vite/less-plugin';
import { preBuildPlugin } from '../../../scripts/vite/prebuild-plugin';
import { createViteConfig } from '../../../vite.config.base';

export default createViteConfig('@synerise/ds-avatar', {
  plugins: [
    preBuildPlugin({
      script: './build/svgr.js',
      description: 'Generate default avatar components from SVG',
    }),
    lessCompilePlugin(),
  ],
});
