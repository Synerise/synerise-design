// @ts-nocheck
import figma from '@figma/code-connect';

import Select from './Select';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=584-16996&m=dev';

const baseProps = {
  size: figma.enum('Size', {
    Normal: undefined,
    Large: 'large',
  }),
};

// =========================================================
// Catch-all: default state per Size, no prefix/suffix
// =========================================================

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Default', Prefix: 'False', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => <Select placeholder="Select" size={size} />,
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Default Grey', Prefix: 'False', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => <Select grey placeholder="Select" size={size} />,
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Filled', Prefix: 'False', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => (
    <Select defaultValue="value" placeholder="Select" size={size} />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Multi Filled', Prefix: 'False', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      mode="multiple"
      defaultValue={['a', 'b']}
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Disabled', Prefix: 'False', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => <Select disabled placeholder="Select" size={size} />,
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Read Only', Prefix: 'False', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => <Select readOnly defaultValue="value" size={size} />,
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Validated', Prefix: 'False', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => (
    <Select errorText="Validation error" placeholder="Select" size={size} />
  ),
});

// =========================================================
// Prefix variants
// =========================================================

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Default', Prefix: 'True', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => (
    <Select prefixel={<span>Prefix</span>} placeholder="Select" size={size} />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Filled', Prefix: 'True', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      defaultValue="value"
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Multi Filled', Prefix: 'True', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      mode="multiple"
      defaultValue={['a', 'b']}
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Disabled', Prefix: 'True', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      disabled
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Read Only', Prefix: 'True', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      readOnly
      defaultValue="value"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Validated', Prefix: 'True', Suffix: 'False' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      errorText="Validation error"
      placeholder="Select"
      size={size}
    />
  ),
});

// =========================================================
// Suffix variants
// =========================================================

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Default', Prefix: 'False', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select suffixel={<span>Suffix</span>} placeholder="Select" size={size} />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Filled', Prefix: 'False', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      suffixel={<span>Suffix</span>}
      defaultValue="value"
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Multi Filled', Prefix: 'False', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      suffixel={<span>Suffix</span>}
      mode="multiple"
      defaultValue={['a', 'b']}
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Disabled', Prefix: 'False', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      suffixel={<span>Suffix</span>}
      disabled
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Read Only', Prefix: 'False', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      suffixel={<span>Suffix</span>}
      readOnly
      defaultValue="value"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Validated', Prefix: 'False', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      suffixel={<span>Suffix</span>}
      errorText="Validation error"
      placeholder="Select"
      size={size}
    />
  ),
});

// =========================================================
// Prefix + Suffix variants
// =========================================================

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Default', Prefix: 'True', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      suffixel={<span>Suffix</span>}
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Filled', Prefix: 'True', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      suffixel={<span>Suffix</span>}
      defaultValue="value"
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Multi Filled', Prefix: 'True', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      suffixel={<span>Suffix</span>}
      mode="multiple"
      defaultValue={['a', 'b']}
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Disabled', Prefix: 'True', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      suffixel={<span>Suffix</span>}
      disabled
      placeholder="Select"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Read Onl', Prefix: 'True', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      suffixel={<span>Suffix</span>}
      readOnly
      defaultValue="value"
      size={size}
    />
  ),
});

figma.connect(Select, FIGMA_URL, {
  variant: { State: 'Validated', Prefix: 'True', Suffix: 'True' },
  props: baseProps,
  example: ({ size }) => (
    <Select
      prefixel={<span>Prefix</span>}
      suffixel={<span>Suffix</span>}
      errorText="Validation error"
      placeholder="Select"
      size={size}
    />
  ),
});
