import figma from '@figma/code-connect';

import Switch, { RawSwitch } from './Switch';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=249-3688&m=dev';

const labelProps = {
  labelNested: figma.nestedProps('Label', {
    text: figma.string('Text'),
  }),
};

const descriptionProps = {
  labelNested: figma.nestedProps('Label', {
    text: figma.string('Text'),
  }),
  descriptionNested: figma.nestedProps('Description', {
    text: figma.string('Text'),
  }),
};

figma.connect(Switch, FIGMA_URL, {
  variant: { State: 'Default', 'Content Type': 'Solo' },
  example: () => <RawSwitch />,
});

figma.connect(Switch, FIGMA_URL, {
  variant: { State: 'Default', 'Content Type': 'Label' },
  props: labelProps,
  example: ({ labelNested }) => <Switch label={labelNested.text} />,
});

figma.connect(Switch, FIGMA_URL, {
  variant: { State: 'Default', 'Content Type': 'With Description' },
  props: descriptionProps,
  example: ({ labelNested, descriptionNested }) => (
    <Switch label={labelNested.text} description={descriptionNested.text} />
  ),
});

figma.connect(Switch, FIGMA_URL, {
  variant: { State: 'Selected', 'Content Type': 'Solo' },
  example: () => <RawSwitch checked />,
});

figma.connect(Switch, FIGMA_URL, {
  variant: { State: 'Selected', 'Content Type': 'Label' },
  props: labelProps,
  example: ({ labelNested }) => <Switch checked label={labelNested.text} />,
});

figma.connect(Switch, FIGMA_URL, {
  variant: { State: 'Selected', 'Content Type': 'With Description' },
  props: descriptionProps,
  example: ({ labelNested, descriptionNested }) => (
    <Switch
      checked
      label={labelNested.text}
      description={descriptionNested.text}
    />
  ),
});

figma.connect(Switch, FIGMA_URL, {
  variant: { State: 'Disabled', 'Content Type': 'Solo' },
  example: () => <RawSwitch disabled />,
});

figma.connect(Switch, FIGMA_URL, {
  variant: { State: 'Disabled', 'Content Type': 'Label' },
  props: labelProps,
  example: ({ labelNested }) => <Switch disabled label={labelNested.text} />,
});

figma.connect(Switch, FIGMA_URL, {
  variant: { State: 'Disabled', 'Content Type': 'With Description' },
  props: descriptionProps,
  example: ({ labelNested, descriptionNested }) => (
    <Switch
      disabled
      label={labelNested.text}
      description={descriptionNested.text}
    />
  ),
});
