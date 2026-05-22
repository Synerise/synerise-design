import figma from '@figma/code-connect';

import MetricCard from './MetricCard';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=14724-545&m=dev';

figma.connect(MetricCard, FIGMA_URL, {
  variant: { Background: 'Gray' },
  props: {
    tooltip: figma.boolean('Icon', {
      true: 'Metric description',
      false: undefined,
    }),
    headerRightSide: figma.instance('Button'),
  },
  example: ({ tooltip, headerRightSide }) => (
    <MetricCard
      title="Metric title"
      displayValue="1.2K"
      hoverValue="1,234"
      tooltip={tooltip}
      headerRightSide={headerRightSide}
      greyBackground
    />
  ),
});

figma.connect(MetricCard, FIGMA_URL, {
  variant: { Background: 'White' },
  props: {
    tooltip: figma.boolean('Icon', {
      true: 'Metric description',
      false: undefined,
    }),
    headerRightSide: figma.instance('Button'),
  },
  example: ({ tooltip, headerRightSide }) => (
    <MetricCard
      title="Metric title"
      displayValue="1.2K"
      hoverValue="1,234"
      tooltip={tooltip}
      headerRightSide={headerRightSide}
    />
  ),
});
