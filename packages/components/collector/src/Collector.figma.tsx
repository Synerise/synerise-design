// @ts-nocheck
import figma from '@figma/code-connect';

import Collector from './Collector';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=729-13722&m=dev';

figma.connect(Collector, FIGMA_URL, {
  variant: { State: 'Default' },
  props: {
    placeholder: figma.string('Placeholder text'),
    label: figma.boolean('Show label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ placeholder, label, description }) => (
    <Collector
      selected={[]}
      suggestions={[]}
      onItemSelect={() => {}}
      label={label}
      description={description}
      texts={{ placeholder }}
    />
  ),
});

figma.connect(Collector, FIGMA_URL, {
  variant: { State: 'Filled' },
  props: {
    label: figma.boolean('Show label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ label, description }) => (
    <Collector
      selected={[{ text: 'Item' }]}
      suggestions={[{ text: 'Item' }, { text: 'Example' }]}
      onItemSelect={() => {}}
      onItemAdd={(name) => ({ text: String(name) })}
      allowMultipleValues
      label={label}
      description={description}
    />
  ),
});

figma.connect(Collector, FIGMA_URL, {
  variant: { State: 'Multi filled' },
  props: {
    label: figma.boolean('Show label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ label, description }) => (
    <Collector
      selected={[
        { text: 'Item' },
        { text: 'Example Item' },
        { text: 'Example' },
        { text: 'Another Item' },
        { text: 'Item Default' },
      ]}
      suggestions={[{ text: 'Item' }, { text: 'Example' }]}
      onItemSelect={() => {}}
      onItemAdd={(name) => ({ text: String(name) })}
      allowMultipleValues
      showCount
      label={label}
      description={description}
    />
  ),
});

figma.connect(Collector, FIGMA_URL, {
  variant: { State: 'Validated' },
  props: {
    placeholder: figma.string('Placeholder text'),
    label: figma.boolean('Show label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ placeholder, label, description }) => (
    <Collector
      selected={[]}
      suggestions={[]}
      onItemSelect={() => {}}
      errorText="Error"
      label={label}
      description={description}
      texts={{ placeholder }}
    />
  ),
});

figma.connect(Collector, FIGMA_URL, {
  variant: { State: 'Disabled' },
  props: {
    placeholder: figma.string('Placeholder text'),
    label: figma.boolean('Show label', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show description', {
      true: 'Description',
      false: undefined,
    }),
  },
  example: ({ placeholder, label, description }) => (
    <Collector
      selected={[]}
      suggestions={[]}
      onItemSelect={() => {}}
      disabled
      label={label}
      description={description}
      texts={{ placeholder }}
    />
  ),
});
