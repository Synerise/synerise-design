// @ts-nocheck
import figma from '@figma/code-connect';

import Scrollbar from './Scrollbar';

const SCROLLBAR_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=318-5166&m=dev';

const SCROLLBAR_LARGE_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=3178-21976&m=dev';

figma.connect(Scrollbar, SCROLLBAR_URL, {
  variant: { State: 'Default' },
  example: () => (
    <Scrollbar maxHeight={400}>
      <div />
    </Scrollbar>
  ),
});

figma.connect(Scrollbar, SCROLLBAR_LARGE_URL, {
  example: () => (
    <Scrollbar largeSize maxHeight={400}>
      <div />
    </Scrollbar>
  ),
});
