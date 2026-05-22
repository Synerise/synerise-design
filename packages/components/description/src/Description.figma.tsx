import figma from '@figma/code-connect';

import Description from './Description';
import DescriptionRow from './Row/DescriptionRow';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=746-16119&m=dev';

figma.connect(Description, FIGMA_URL, {
  variant: { 'Scaling type': 'Inline' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => (
    <Description type="inline">
      <DescriptionRow label={label} value="Value" />
    </Description>
  ),
});

figma.connect(Description, FIGMA_URL, {
  variant: { 'Scaling type': '50x50' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => (
    <Description type="table" ratio="50-50">
      <DescriptionRow label={label} value="Value" />
    </Description>
  ),
});

figma.connect(Description, FIGMA_URL, {
  variant: { 'Scaling type': '25x75' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => (
    <Description type="table" ratio="25-75">
      <DescriptionRow label={label} value="Value" />
    </Description>
  ),
});

figma.connect(Description, FIGMA_URL, {
  variant: { 'Scaling type': 'Corner' },
  props: {
    label: figma.string('Text'),
  },
  example: ({ label }) => (
    <Description type="corner">
      <DescriptionRow label={label} value="Value" />
    </Description>
  ),
});
