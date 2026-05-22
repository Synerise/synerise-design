import figma from '@figma/code-connect';

import Badge from './Badge';

const FIGMA_URL_BADGE_DOT =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=366-7197&m=dev';

const FIGMA_URL_BADGE_DOT_PULSING =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=366-7250&m=dev';

const FIGMA_URL_BADGE_NUMBER =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=366-7133&m=dev';

figma.connect(Badge, FIGMA_URL_BADGE_DOT, {
  example: () => <Badge status="active" />,
});

figma.connect(Badge, FIGMA_URL_BADGE_DOT_PULSING, {
  props: {
    status: figma.enum('Type', {
      Error: 'blocked',
      Warning: 'warning',
      Success: 'active',
      Processing: 'processing',
    }),
  },
  example: ({ status }) => <Badge status={status} flag pulsing />,
});

figma.connect(Badge, FIGMA_URL_BADGE_NUMBER, {
  variant: { Comntent: 'Full Color' },
  props: {
    count: figma.string('✏️Value'),
    backgroundColor: figma.enum('Type', {
      Default: 'blue',
      Warning: 'orange',
      Success: 'green',
      Gray: 'grey',
      White: 'white',
    }),
  },
  example: ({ count, backgroundColor }) => (
    <Badge
      count={count}
      backgroundColor={backgroundColor}
      backgroundColorHue="600"
      textColor="white"
      textColorHue="050"
    />
  ),
});

figma.connect(Badge, FIGMA_URL_BADGE_NUMBER, {
  variant: { Comntent: 'Full Color+Outline' },
  props: {
    count: figma.string('✏️Value'),
    backgroundColor: figma.enum('Type', {
      Default: 'blue',
      Warning: 'orange',
      Success: 'green',
      Gray: 'grey',
      White: 'white',
    }),
  },
  example: ({ count, backgroundColor }) => (
    <Badge
      count={count}
      backgroundColor={backgroundColor}
      backgroundColorHue="600"
      textColor="white"
      textColorHue="050"
      outlined
    />
  ),
});

figma.connect(Badge, FIGMA_URL_BADGE_NUMBER, {
  variant: { Comntent: 'Outline' },
  props: {
    count: figma.string('✏️Value'),
    textColor: figma.enum('Type', {
      Default: 'blue',
      Warning: 'orange',
      Success: 'green',
      Gray: 'grey',
      White: 'white',
    }),
  },
  example: ({ count, textColor }) => (
    <Badge
      count={count}
      backgroundColor="white"
      backgroundColorHue="050"
      textColor={textColor}
      textColorHue="600"
      outlined
    />
  ),
});
