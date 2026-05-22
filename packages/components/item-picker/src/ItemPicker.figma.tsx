// @ts-nocheck
import figma from '@figma/code-connect';

import ItemPicker from './ItemPicker';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=499-8616&m=dev';

figma.connect(ItemPicker, FIGMA_URL, {
  variant: { State: 'Default', Hover: 'False' },
  props: {
    size: figma.enum('Size', {
      Large: 'large',
      Normal: 'small',
    }),
    placeholder: figma.string('Text'),
    label: figma.boolean('Show Label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show Description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ size, placeholder, label, description }) => (
    <ItemPicker
      isNewVersion
      items={[]}
      onChange={() => {}}
      placeholder={placeholder}
      label={label}
      description={description}
      triggerProps={{ size }}
    />
  ),
});

figma.connect(ItemPicker, FIGMA_URL, {
  variant: { State: 'Selected', Hover: 'False' },
  props: {
    size: figma.enum('Size', {
      Large: 'large',
      Normal: 'small',
    }),
    selectedText: figma.string('Filled Text'),
    label: figma.boolean('Show Label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show Description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ size, selectedText, label, description }) => (
    <ItemPicker
      isNewVersion
      items={[{ id: '1', text: selectedText }]}
      selectedItem={{ id: '1', text: selectedText }}
      onChange={() => {}}
      onClear={() => {}}
      label={label}
      description={description}
      triggerProps={{ size }}
    />
  ),
});

figma.connect(ItemPicker, FIGMA_URL, {
  variant: { State: 'Disabled', Hover: 'False' },
  props: {
    size: figma.enum('Size', {
      Large: 'large',
      Normal: 'small',
    }),
    placeholder: figma.string('Text'),
    label: figma.boolean('Show Label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show Description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ size, placeholder, label, description }) => (
    <ItemPicker
      isNewVersion
      items={[]}
      onChange={() => {}}
      placeholder={placeholder}
      label={label}
      description={description}
      disabled
      triggerProps={{ size }}
    />
  ),
});

figma.connect(ItemPicker, FIGMA_URL, {
  variant: { State: 'Selected+Disabled', Hover: 'False' },
  props: {
    size: figma.enum('Size', {
      Large: 'large',
      Normal: 'small',
    }),
    selectedText: figma.string('Filled Text'),
    label: figma.boolean('Show Label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show Description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ size, selectedText, label, description }) => (
    <ItemPicker
      isNewVersion
      items={[{ id: '1', text: selectedText }]}
      selectedItem={{ id: '1', text: selectedText }}
      onChange={() => {}}
      label={label}
      description={description}
      disabled
      triggerProps={{ size }}
    />
  ),
});

figma.connect(ItemPicker, FIGMA_URL, {
  variant: { State: 'Validated', Hover: 'False' },
  props: {
    size: figma.enum('Size', {
      Large: 'large',
      Normal: 'small',
    }),
    placeholder: figma.string('Text'),
    label: figma.boolean('Show Label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show Description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ size, placeholder, label, description }) => (
    <ItemPicker
      isNewVersion
      items={[]}
      onChange={() => {}}
      placeholder={placeholder}
      label={label}
      description={description}
      error
      errorText="Error message"
      triggerProps={{ size }}
    />
  ),
});

figma.connect(ItemPicker, FIGMA_URL, {
  variant: { State: 'Selected+Validated', Hover: 'False' },
  props: {
    size: figma.enum('Size', {
      Large: 'large',
      Normal: 'small',
    }),
    selectedText: figma.string('Filled Text'),
    label: figma.boolean('Show Label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show Description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ size, selectedText, label, description }) => (
    <ItemPicker
      isNewVersion
      items={[{ id: '1', text: selectedText }]}
      selectedItem={{ id: '1', text: selectedText }}
      onChange={() => {}}
      onClear={() => {}}
      label={label}
      description={description}
      error
      errorText="Error message"
      triggerProps={{ size }}
    />
  ),
});
