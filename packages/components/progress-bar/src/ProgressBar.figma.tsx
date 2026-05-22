// @ts-nocheck
import figma from '@figma/code-connect';

import ProgressBar from './ProgressBar';

const MAIN_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=330-7606&m=dev';

const INLINE_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=330-7730&m=dev';

figma.connect(ProgressBar, MAIN_URL, {
  props: {
    label: figma.boolean('Show Header#330:8', {
      true: figma.string('Label Text#330:3'),
      false: undefined,
    }),
    description: figma.boolean('Show Description#330:7', {
      true: figma.string('Text#184:3'),
      false: undefined,
    }),
  },
  example: ({ label, description }) => (
    <ProgressBar percent={50} label={label} description={description} />
  ),
});

figma.connect(ProgressBar, INLINE_URL, {
  variant: { Thickness: 'Thin' },
  props: {
    label: figma.boolean('Show Value#330:11', {
      true: figma.string('Value Text#330:12'),
      false: undefined,
    }),
  },
  example: ({ label }) => (
    <ProgressBar percent={50} inline thin label={label} />
  ),
});

figma.connect(ProgressBar, INLINE_URL, {
  variant: { Thickness: 'Fat' },
  props: {
    label: figma.boolean('Show Value#330:11', {
      true: figma.string('Value Text#330:12'),
      false: undefined,
    }),
  },
  example: ({ label }) => <ProgressBar percent={50} inline label={label} />,
});
