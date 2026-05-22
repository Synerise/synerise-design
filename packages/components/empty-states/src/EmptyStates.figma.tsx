import figma from '@figma/code-connect';

import EmptyStates from './EmptyStates';
import { EmptyStatesSize } from './EmptyStates.types';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=579-10637&m=dev';

figma.connect(EmptyStates, FIGMA_URL, {
  variant: { Size: 'Small', Buttons: 'One' },
  props: {
    text: figma.string('Label'),
    label: figma.boolean('Show Description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    button: figma.boolean('Show Button', {
      true: <button type="button">Action</button>,
      false: undefined,
    }),
    customIcon: figma.instance('Icon L'),
  },
  example: ({ text, label, button, customIcon }) => (
    <EmptyStates
      size={EmptyStatesSize.SMALL}
      text={text}
      label={label}
      button={button}
      customIcon={customIcon}
    />
  ),
});

figma.connect(EmptyStates, FIGMA_URL, {
  variant: { Size: 'Small', Buttons: 'Two' },
  props: {
    text: figma.string('Label'),
    label: figma.boolean('Show Description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    customIcon: figma.instance('Icon L'),
  },
  example: ({ text, label, customIcon }) => (
    <EmptyStates
      size={EmptyStatesSize.SMALL}
      text={text}
      label={label}
      button={
        <>
          <button type="button">Primary</button>
          <button type="button">Secondary</button>
        </>
      }
      customIcon={customIcon}
    />
  ),
});

figma.connect(EmptyStates, FIGMA_URL, {
  variant: { Size: 'Big', Buttons: 'One' },
  props: {
    text: figma.string('Label'),
    label: figma.boolean('Show Description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    button: figma.boolean('Show Button', {
      true: <button type="button">Action</button>,
      false: undefined,
    }),
    customIcon: figma.instance('Icon L'),
  },
  example: ({ text, label, button, customIcon }) => (
    <EmptyStates
      size={EmptyStatesSize.MEDIUM}
      fontSize={EmptyStatesSize.MEDIUM}
      text={text}
      label={label}
      button={button}
      customIcon={customIcon}
    />
  ),
});

figma.connect(EmptyStates, FIGMA_URL, {
  variant: { Size: 'Big', Buttons: 'Two' },
  props: {
    text: figma.string('Label'),
    label: figma.boolean('Show Description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    customIcon: figma.instance('Icon L'),
  },
  example: ({ text, label, customIcon }) => (
    <EmptyStates
      size={EmptyStatesSize.MEDIUM}
      fontSize={EmptyStatesSize.MEDIUM}
      text={text}
      label={label}
      button={
        <>
          <button type="button">Primary</button>
          <button type="button">Secondary</button>
        </>
      }
      customIcon={customIcon}
    />
  ),
});

figma.connect(EmptyStates, FIGMA_URL, {
  variant: { Size: 'Small+XL icon', Buttons: 'One' },
  props: {
    text: figma.string('Label'),
    label: figma.boolean('Show Description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    button: figma.boolean('Show Button', {
      true: <button type="button">Action</button>,
      false: undefined,
    }),
    customIcon: figma.instance('Icon XL'),
  },
  example: ({ text, label, button, customIcon }) => (
    <EmptyStates
      size={EmptyStatesSize.MEDIUM}
      text={text}
      label={label}
      button={button}
      customIcon={customIcon}
    />
  ),
});

figma.connect(EmptyStates, FIGMA_URL, {
  variant: { Size: 'Small+XL icon', Buttons: 'Two' },
  props: {
    text: figma.string('Label'),
    label: figma.boolean('Show Description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    customIcon: figma.instance('Icon XL'),
  },
  example: ({ text, label, customIcon }) => (
    <EmptyStates
      size={EmptyStatesSize.MEDIUM}
      text={text}
      label={label}
      button={
        <>
          <button type="button">Primary</button>
          <button type="button">Secondary</button>
        </>
      }
      customIcon={customIcon}
    />
  ),
});
