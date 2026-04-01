// @ts-nocheck
import figma from '@figma/code-connect';

import InputNumber from './InputNumber';

// InputNumber shares the Input component set in Figma, scoped to Content Type = Number
const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=239-8476&m=dev';

const baseProps = {
  labelNested: figma.nestedProps('Label', {
    text: figma.string('Text'),
  }),
  descriptionNested: figma.nestedProps('Description', {
    text: figma.string('Text'),
  }),
  placeholder: figma.string('Text'),
  size: figma.enum('Size', {
    Normal: undefined,
    Large: 'large',
  }),
};

// Catch-all: matches any Number variant (any state, prefix, suffix)
figma.connect(InputNumber, FIGMA_URL, {
  variant: { 'Content Type': 'Number' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <InputNumber
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
    />
  ),
});

// --- Specific state overrides ---

figma.connect(InputNumber, FIGMA_URL, {
  variant: { 'Content Type': 'Number', State: 'Filled' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <InputNumber
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      value={0}
    />
  ),
});

figma.connect(InputNumber, FIGMA_URL, {
  variant: { 'Content Type': 'Number', State: 'Disabled' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <InputNumber
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      disabled
    />
  ),
});

figma.connect(InputNumber, FIGMA_URL, {
  variant: { 'Content Type': 'Number', State: 'Read-only' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <InputNumber
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      readOnly
    />
  ),
});

figma.connect(InputNumber, FIGMA_URL, {
  variant: { 'Content Type': 'Number', State: 'Validated' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <InputNumber
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      errorText="Validation error"
    />
  ),
});

// --- Prefix / Suffix overrides ---

figma.connect(InputNumber, FIGMA_URL, {
  variant: { 'Content Type': 'Number', Prefix: 'True', Suffix: 'False' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <InputNumber
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      prefixel={<span>Prefix</span>}
    />
  ),
});

figma.connect(InputNumber, FIGMA_URL, {
  variant: { 'Content Type': 'Number', Prefix: 'False', Suffix: 'True' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <InputNumber
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      suffixel={<span>Suffix</span>}
    />
  ),
});

figma.connect(InputNumber, FIGMA_URL, {
  variant: { 'Content Type': 'Number', Prefix: 'True', Suffix: 'True' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <InputNumber
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      prefixel={<span>Prefix</span>}
      suffixel={<span>Suffix</span>}
    />
  ),
});
