import { lessCompilePlugin } from '../../../scripts/vite/less-plugin';
import { preBuildPlugin } from '../../../scripts/vite/prebuild-plugin';
import { createViteConfig } from '../../../vite.config.base';

export default createViteConfig('@synerise/ds-icon', {
  plugins: [
    // Generate React components from SVG files
    preBuildPlugin({
      script: './build/svgr.js',
      description: 'Generate icon components from SVG',
    }),
    // Compile LESS to CSS
    lessCompilePlugin(),
  ],
});
