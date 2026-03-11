import figma from '@figma/code-connect';

import Button from './Button';
import { ButtonMode } from './Button.types';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=139:4694&m=dev';

const typeMapping = figma.enum('Variant', {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  'Tetriary White': 'tertiary-white',
  'Ghost Primary': 'ghost-primary',
  'Ghost Secondary': 'ghost',
  'Ghost Secondary White': 'ghost-white',
});

const modeMapping = figma.enum('Content Type', {
  Simple: undefined,
  'Icon left': ButtonMode.ICON_LABEL,
  'Icon right': ButtonMode.LABEL_ICON,
  'Icon solo': ButtonMode.SINGLE_ICON,
  '2 icons': ButtonMode.TWO_ICONS,
  Split: ButtonMode.SPLIT,
});

const sizeMapping = figma.enum('Size', {
  Normal: undefined,
  Large: 'large',
});

const baseProps = {
  type: typeMapping,
  mode: modeMapping,
  size: sizeMapping,
  label: figma.string('✏️Text'),
};

figma.connect(Button, FIGMA_URL, {
  variant: { State: 'Default' },
  props: baseProps,
  example: ({ type, mode, size, label }) => (
    <Button type={type} mode={mode} size={size}>
      {label}
    </Button>
  ),
});

figma.connect(Button, FIGMA_URL, {
  variant: { State: 'Disabled' },
  props: baseProps,
  example: ({ type, mode, size, label }) => (
    <Button type={type} mode={mode} size={size} disabled>
      {label}
    </Button>
  ),
});
