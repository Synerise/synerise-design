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
  configOverride: {
    build: {
      // iconLoader.ts dynamically imports the five icon-set barrels. With modulePreload on, Vite
      // inlines a __vite__mapDeps table naming every module in those chunks — all 1195 icon paths,
      // ~10 kB gzipped — into iconLoader.js, which then ships to every consumer that renders an
      // Icon at all. The preload links would be meaningless anyway: consumers re-bundle this
      // package, so the dist-relative paths never survive.
      modulePreload: false,
    },
  },
});
