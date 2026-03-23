import { lessCompilePlugin } from '../../../scripts/vite/less-plugin';
import { createViteConfig } from '../../../vite.config.base';

export default createViteConfig('@synerise/ds-context-selector', {
  plugins: [lessCompilePlugin()],
});
