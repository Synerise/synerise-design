// @ts-nocheck
import figma from '@figma/code-connect';

import Status from './Status';

const URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=561-9186&m=dev';

figma.connect(Status, URL, {
  variant: { State: 'Neutral', Stroke: 'Full' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => <Status type="default" label={label} />,
});

figma.connect(Status, URL, {
  variant: { State: 'Neutral', Stroke: 'Dashed' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => <Status type="default" label={label} dashed />,
});

figma.connect(Status, URL, {
  variant: { State: 'Success', Stroke: 'Full' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => <Status type="success" label={label} />,
});

figma.connect(Status, URL, {
  variant: { State: 'Success', Stroke: 'Dashed' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => <Status type="success" label={label} dashed />,
});

figma.connect(Status, URL, {
  variant: { State: 'Warning', Stroke: 'Full' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => <Status type="warning" label={label} />,
});

figma.connect(Status, URL, {
  variant: { State: 'Warning', Stroke: 'Dashed' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => <Status type="warning" label={label} dashed />,
});

figma.connect(Status, URL, {
  variant: { State: 'Error', Stroke: 'Full' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => <Status type="danger" label={label} />,
});

figma.connect(Status, URL, {
  variant: { State: 'Error', Stroke: 'Dashed' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => <Status type="danger" label={label} dashed />,
});

figma.connect(Status, URL, {
  variant: { State: 'Info', Stroke: 'Full' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => <Status type="info" label={label} />,
});

figma.connect(Status, URL, {
  variant: { State: 'Info', Stroke: 'Dashed' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => <Status type="info" label={label} dashed />,
});
