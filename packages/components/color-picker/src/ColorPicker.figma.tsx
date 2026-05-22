// @ts-nocheck
import figma from '@figma/code-connect';

import ColorPicker from './ColorPicker';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=1894-25476&m=dev';

figma.connect(ColorPicker, FIGMA_URL, {
  variant: { State: 'Default' },
  example: () => <ColorPicker placeholder="Select color" />,
});

figma.connect(ColorPicker, FIGMA_URL, {
  variant: { State: 'Filled' },
  example: () => <ColorPicker value="#00FFFF" />,
});

figma.connect(ColorPicker, FIGMA_URL, {
  variant: { State: 'Filled+Focus' },
  example: () => <ColorPicker value="#00FFFF" />,
});

figma.connect(ColorPicker, FIGMA_URL, {
  variant: { State: 'Disabled' },
  example: () => <ColorPicker value="#00FFFF" disabled />,
});

figma.connect(ColorPicker, FIGMA_URL, {
  variant: { State: 'Validated' },
  example: () => (
    <ColorPicker value="#00FFFF" error errorText="Validation error" />
  ),
});
