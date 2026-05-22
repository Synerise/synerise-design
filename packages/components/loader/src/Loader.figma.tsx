import figma from '@figma/code-connect';

import Loader from './Loader';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=762-14665&m=dev';

const sizeProp = {
  size: figma.enum('Size', {
    Small: 'S',
    Medium: 'M',
    Large: 'L',
  }),
};

figma.connect(Loader, FIGMA_URL, {
  variant: { 'Label positioning': 'Without Label' },
  props: sizeProp,
  example: ({ size }) => <Loader size={size} />,
});

figma.connect(Loader, FIGMA_URL, {
  variant: { 'Label positioning': 'Label bottom' },
  props: sizeProp,
  example: ({ size }) => (
    <Loader size={size} label="Loading..." labelPosition="bottom" />
  ),
});

figma.connect(Loader, FIGMA_URL, {
  variant: { 'Label positioning': 'Label Right' },
  props: sizeProp,
  example: ({ size }) => (
    <Loader size={size} label="Loading..." labelPosition="right" />
  ),
});
