import figma from '@figma/code-connect';

import Badge from './Badge';

const FIGMA_URL_BADGE_DOT =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=366-7197&m=dev';

const FIGMA_URL_BADGE_DOT_PULSING =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=366-7250&m=dev';

const FIGMA_URL_BADGE_NUMBER =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=366-7133&m=dev';

figma.connect(Badge, FIGMA_URL_BADGE_DOT, {
  props: {
    status: figma.enum('Type', {
      Active: 'active',
      Inactive: 'inactive',
      Blocked: 'blocked',
      Warning: 'warning',
      Processing: 'processing',
    }),
  },
  example: ({ status }) => <Badge status={status} />,
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
    status: figma.enum('Type', {
      Default: 'processing',
      Warning: 'warning',
      Success: 'active',
      Gray: 'inactive',
    }),
  },
  example: ({ count, status }) => <Badge count={count} status={status} />,
});

figma.connect(Badge, FIGMA_URL_BADGE_NUMBER, {
  variant: { Comntent: 'Full Color+Outline' },
  props: {
    count: figma.string('✏️Value'),
    status: figma.enum('Type', {
      Default: 'processing',
      Warning: 'warning',
      Success: 'active',
      Gray: 'inactive',
    }),
  },
  example: ({ count, status }) => (
    <Badge count={count} status={status} outlined />
  ),
});
