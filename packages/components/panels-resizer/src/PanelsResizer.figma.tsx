// @ts-nocheck
import figma from '@figma/code-connect';

import { PanelsResizer } from './PanelsResizer';

const PANELS_RESIZER_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=16304-551&m=dev';

figma.connect(PanelsResizer, PANELS_RESIZER_URL, {
  props: {
    isHorizontal: figma.enum('Type', {
      Horizontal: true,
      Vertical: false,
    }),
  },
  example: ({ isHorizontal }) => (
    <PanelsResizer
      leftPanel={<div>Left panel</div>}
      rightPanel={<div>Right panel</div>}
      isHorizontal={isHorizontal}
    />
  ),
});
