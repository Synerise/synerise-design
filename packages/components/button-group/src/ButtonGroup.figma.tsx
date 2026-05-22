import figma from '@figma/code-connect';
import Button from '@synerise/ds-button';

import ButtonGroup from './ButtonGroup';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=5491-11179&m=dev';

const sizeMapping = figma.enum('Size', {
  Large: 'large',
  Small: 'small',
});

figma.connect(ButtonGroup, FIGMA_URL, {
  props: {
    size: sizeMapping,
  },
  example: ({ size }) => (
    <ButtonGroup size={size}>
      <Button type="secondary">Label</Button>
      <Button type="secondary">Label</Button>
      <Button type="secondary">Label</Button>
    </ButtonGroup>
  ),
});
