import figma from '@figma/code-connect';

import Estimation from './Estimation';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=15108-2490&m=dev';

figma.connect(Estimation, FIGMA_URL, {
  variant: { Type: 'Default', State: 'Default' },
  props: {
    value: figma.string('Value'),
  },
  example: ({ value }) => <Estimation label="Label" value={value} />,
});

figma.connect(Estimation, FIGMA_URL, {
  variant: { Type: 'Default', State: 'Loading' },
  props: {
    value: figma.string('Value'),
  },
  example: ({ value }) => <Estimation label="Label" value={value} isLoading />,
});

figma.connect(Estimation, FIGMA_URL, {
  variant: { Type: 'Default', State: 'Error' },
  props: {
    value: figma.string('Value'),
  },
  example: ({ value }) => (
    <Estimation
      label="Label"
      value={value}
      errorMessage="Failed to load data"
    />
  ),
});

figma.connect(Estimation, FIGMA_URL, {
  variant: { Type: 'Audience', State: 'Default' },
  props: {
    value: figma.string('Value'),
  },
  example: ({ value }) => (
    <Estimation
      label="Label"
      value={value}
      calculatedDate={new Date()}
      progressBarValues={[{ percent: 70, color: '#3a8bff', label: 'Audience' }]}
    />
  ),
});

figma.connect(Estimation, FIGMA_URL, {
  variant: { Type: 'Audience', State: 'Loading' },
  props: {
    value: figma.string('Value'),
  },
  example: ({ value }) => (
    <Estimation
      label="Label"
      value={value}
      isLoading={{ total: true, progressBar: true }}
      progressBarValues={[{ percent: 70, color: '#3a8bff', label: 'Audience' }]}
    />
  ),
});

figma.connect(Estimation, FIGMA_URL, {
  variant: { Type: 'Audience', State: 'Error' },
  props: {
    value: figma.string('Value'),
  },
  example: ({ value }) => (
    <Estimation
      label="Label"
      value={value}
      errorMessage="Failed to load data"
      progressBarValues={[{ percent: 70, color: '#3a8bff', label: 'Audience' }]}
    />
  ),
});

figma.connect(Estimation, FIGMA_URL, {
  variant: { Type: 'Audience+CG', State: 'Default' },
  props: {
    value: figma.string('Value'),
  },
  example: ({ value }) => (
    <Estimation
      label="Label"
      value={value}
      calculatedDate={new Date()}
      progressBarValues={[
        { percent: 60, color: '#3a8bff', label: 'Audience' },
        { percent: 20, color: '#9b51e0', label: 'Control group' },
      ]}
    />
  ),
});

figma.connect(Estimation, FIGMA_URL, {
  variant: { Type: 'Audience+CG', State: 'Loading' },
  props: {
    value: figma.string('Value'),
  },
  example: ({ value }) => (
    <Estimation
      label="Label"
      value={value}
      isLoading={{ total: true, progressBar: true }}
      progressBarValues={[
        { percent: 60, color: '#3a8bff', label: 'Audience' },
        { percent: 20, color: '#9b51e0', label: 'Control group' },
      ]}
    />
  ),
});

figma.connect(Estimation, FIGMA_URL, {
  variant: { Type: 'Audience+CG', State: 'Error' },
  props: {
    value: figma.string('Value'),
  },
  example: ({ value }) => (
    <Estimation
      label="Label"
      value={value}
      errorMessage="Failed to load data"
      progressBarValues={[
        { percent: 60, color: '#3a8bff', label: 'Audience' },
        { percent: 20, color: '#9b51e0', label: 'Control group' },
      ]}
    />
  ),
});
