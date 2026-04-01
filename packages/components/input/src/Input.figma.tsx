// @ts-nocheck
import figma from '@figma/code-connect';

import { Input } from './Input';

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
  icon1: figma.instance('Icon 1'),
  icon2: figma.instance('Icon 2'),
};

// =========================================================
// Catch-all connects per Content Type
// These ensure ANY Text/Text+Icon/Text+2 Icons variant
// shows <Input>, not <InputNumber>. More specific connects
// below override when they match.
// =========================================================

figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text+Icon' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size, icon1 }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      icon1={icon1}
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text+2 Icons' },
  props: baseProps,
  example: ({
    labelNested,
    descriptionNested,
    placeholder,
    size,
    icon1,
    icon2,
  }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      icon1={icon1}
      icon2={icon2}
    />
  ),
});

// =========================================================
// Specific state overrides — Content Type: Text
// =========================================================

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Filled', 'Content Type': 'Text' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      value={placeholder}
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Disabled', 'Content Type': 'Text' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      disabled
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Read-only', 'Content Type': 'Text' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      readOnly
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Validated', 'Content Type': 'Text' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      errorText="Validation error"
    />
  ),
});

// =========================================================
// Specific state overrides — Content Type: Text+Icon
// =========================================================

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Filled', 'Content Type': 'Text+Icon' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size, icon1 }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      value={placeholder}
      icon1={icon1}
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Disabled', 'Content Type': 'Text+Icon' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size, icon1 }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      disabled
      icon1={icon1}
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Read-only', 'Content Type': 'Text+Icon' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size, icon1 }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      readOnly
      icon1={icon1}
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Validated', 'Content Type': 'Text+Icon' },
  props: baseProps,
  example: ({
    labelNested,
    descriptionNested,
    placeholder,
    size,

    icon1,
  }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      errorText="Validation error"
      icon1={icon1}
    />
  ),
});

// =========================================================
// Specific state overrides — Content Type: Text+2 Icons
// =========================================================

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Filled', 'Content Type': 'Text+2 Icons' },
  props: baseProps,
  example: ({
    labelNested,
    descriptionNested,
    placeholder,
    size,
    icon1,
    icon2,
  }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      value={placeholder}
      icon1={icon1}
      icon2={icon2}
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Disabled', 'Content Type': 'Text+2 Icons' },
  props: baseProps,
  example: ({
    labelNested,
    descriptionNested,
    placeholder,
    size,
    icon1,
    icon2,
  }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      disabled
      icon1={icon1}
      icon2={icon2}
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Read-only', 'Content Type': 'Text+2 Icons' },
  props: baseProps,
  example: ({
    labelNested,
    descriptionNested,
    placeholder,
    size,
    icon1,
    icon2,
  }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      readOnly
      icon1={icon1}
      icon2={icon2}
    />
  ),
});

figma.connect(Input, FIGMA_URL, {
  variant: { State: 'Validated', 'Content Type': 'Text+2 Icons' },
  props: baseProps,
  example: ({
    labelNested,
    descriptionNested,
    placeholder,
    size,

    icon1,
    icon2,
  }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      errorText="Validation error"
      icon1={icon1}
      icon2={icon2}
    />
  ),
});

// =========================================================
// Prefix / Suffix overrides — all Content Types
// =========================================================

// --- Text with Prefix ---
figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text', Prefix: 'True', Suffix: 'False' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      prefixel={<span>Prefix</span>}
    />
  ),
});

// --- Text with Suffix ---
figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text', Prefix: 'False', Suffix: 'True' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      suffixel={<span>Suffix</span>}
    />
  ),
});

// --- Text with Prefix + Suffix ---
figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text', Prefix: 'True', Suffix: 'True' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      prefixel={<span>Prefix</span>}
      suffixel={<span>Suffix</span>}
    />
  ),
});

// --- Text+Icon with Prefix ---
figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text+Icon', Prefix: 'True', Suffix: 'False' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size, icon1 }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      icon1={icon1}
      prefixel={<span>Prefix</span>}
    />
  ),
});

// --- Text+Icon with Suffix ---
figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text+Icon', Prefix: 'False', Suffix: 'True' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size, icon1 }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      icon1={icon1}
      suffixel={<span>Suffix</span>}
    />
  ),
});

// --- Text+Icon with Prefix + Suffix ---
figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text+Icon', Prefix: 'True', Suffix: 'True' },
  props: baseProps,
  example: ({ labelNested, descriptionNested, placeholder, size, icon1 }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      icon1={icon1}
      prefixel={<span>Prefix</span>}
      suffixel={<span>Suffix</span>}
    />
  ),
});

// --- Text+2 Icons with Prefix ---
figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text+2 Icons', Prefix: 'True', Suffix: 'False' },
  props: baseProps,
  example: ({
    labelNested,
    descriptionNested,
    placeholder,
    size,
    icon1,
    icon2,
  }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      icon1={icon1}
      icon2={icon2}
      prefixel={<span>Prefix</span>}
    />
  ),
});

// --- Text+2 Icons with Suffix ---
figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text+2 Icons', Prefix: 'False', Suffix: 'True' },
  props: baseProps,
  example: ({
    labelNested,
    descriptionNested,
    placeholder,
    size,
    icon1,
    icon2,
  }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      icon1={icon1}
      icon2={icon2}
      suffixel={<span>Suffix</span>}
    />
  ),
});

// --- Text+2 Icons with Prefix + Suffix ---
figma.connect(Input, FIGMA_URL, {
  variant: { 'Content Type': 'Text+2 Icons', Prefix: 'True', Suffix: 'True' },
  props: baseProps,
  example: ({
    labelNested,
    descriptionNested,
    placeholder,
    size,
    icon1,
    icon2,
  }) => (
    <Input
      label={labelNested.text}
      description={descriptionNested.text}
      placeholder={placeholder}
      size={size}
      icon1={icon1}
      icon2={icon2}
      prefixel={<span>Prefix</span>}
      suffixel={<span>Suffix</span>}
    />
  ),
});
