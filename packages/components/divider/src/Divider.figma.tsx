import figma from '@figma/code-connect';

import Divider from './Divider';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=316-4940&m=dev';

// Note: the Figma `Show Counter` / `Counter Text` properties are not represented
// here because the DS Divider component has no counter prop.
const baseProps = {
  labelBelow: figma.boolean('Show Header', {
    true: figma.string('Text'),
    false: undefined,
  }),
  hiddenLine: figma.boolean('Show Line', {
    true: undefined,
    false: true,
  }),
};

figma.connect(Divider, FIGMA_URL, {
  variant: { 'Line Type': 'Solid Line', withSideMargin: 'True' },
  props: baseProps,
  example: ({ labelBelow, hiddenLine }) => (
    <Divider withSideMargin labelBelow={labelBelow} hiddenLine={hiddenLine} />
  ),
});

figma.connect(Divider, FIGMA_URL, {
  variant: { 'Line Type': 'Dashed Line', withSideMargin: 'True' },
  props: baseProps,
  example: ({ labelBelow, hiddenLine }) => (
    <Divider
      dashed
      withSideMargin
      labelBelow={labelBelow}
      hiddenLine={hiddenLine}
    />
  ),
});

figma.connect(Divider, FIGMA_URL, {
  variant: { 'Line Type': 'Line Type3', withSideMargin: 'False' },
  props: baseProps,
  example: ({ labelBelow, hiddenLine }) => (
    <Divider labelBelow={labelBelow} hiddenLine={hiddenLine} />
  ),
});

figma.connect(Divider, FIGMA_URL, {
  variant: { 'Line Type': 'Line Type4', withSideMargin: 'False' },
  props: baseProps,
  example: ({ labelBelow, hiddenLine }) => (
    <Divider dashed labelBelow={labelBelow} hiddenLine={hiddenLine} />
  ),
});
