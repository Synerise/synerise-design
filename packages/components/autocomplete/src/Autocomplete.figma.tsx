import figma from '@figma/code-connect';

import Autocomplete from './Autocomplete';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=15751-18999&m=dev';

const baseProps = {
  labelNested: figma.nestedProps('Label', {
    text: figma.string('Text'),
  }),
  descriptionNested: figma.nestedProps('Description', {
    text: figma.string('Text'),
  }),
  placeholder: figma.string('Text'),
  icon1: figma.instance('Icon 1'),
  icon2: figma.instance('Icon 2'),
};

figma.connect(Autocomplete, FIGMA_URL, {
  variant: { State: 'Default' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder }) => (
    <Autocomplete
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
    />
  ),
});

figma.connect(Autocomplete, FIGMA_URL, {
  variant: { State: 'With Icons' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, icon1, icon2 }) => (
    <Autocomplete
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      icon1={icon1}
      icon2={icon2}
    />
  ),
});

figma.connect(Autocomplete, FIGMA_URL, {
  variant: { State: 'Disabled' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder }) => (
    <Autocomplete
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      disabled
    />
  ),
});

figma.connect(Autocomplete, FIGMA_URL, {
  variant: { State: 'With Error' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder }) => (
    <Autocomplete
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      errorText="Validation error"
    />
  ),
});

figma.connect(Autocomplete, FIGMA_URL, {
  variant: { State: 'Loading' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder }) => (
    <Autocomplete
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
    />
  ),
});

figma.connect(Autocomplete, FIGMA_URL, {
  variant: { State: 'Selected' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder }) => (
    <Autocomplete
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      value="pos"
    />
  ),
});
