// @ts-nocheck
import figma from '@figma/code-connect';

import ListItem from './ListItem';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=297-5645&m=dev';

const stateProp = {
  disabled: figma.enum('State', {
    Disabled: true,
    Default: undefined,
    Active: undefined,
    'Read Only': undefined,
  }),
};

// =========================================================
// Content Type: Text
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Text' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem disabled={disabled}>{text}</ListItem>
  ),
});

// =========================================================
// Content Type: Icon+Text
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Icon+Text' },
  props: {
    text: figma.string('Text'),
    prefixel: figma.instance('Icon'),
    suffixel: figma.boolean('Show Suffix', {
      true: figma.instance('Icon'),
      false: undefined,
    }),
    ...stateProp,
  },
  example: ({ text, prefixel, suffixel, disabled }) => (
    <ListItem prefixel={prefixel} suffixel={suffixel} disabled={disabled}>
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Ordered List+Text
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Ordered List+Text' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem ordered disabled={disabled}>
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Avatar S+Text
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Avatar S+Text' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem
      prefixel={
        <UserAvatar size="small" user={{ firstName: 'A', lastName: 'B' }} />
      }
      disabled={disabled}
    >
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Avatar M+Text
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Avatar M+Text' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem
      size="large"
      prefixel={
        <UserAvatar size="medium" user={{ firstName: 'A', lastName: 'B' }} />
      }
      disabled={disabled}
    >
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Copy
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Copy' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem
      copyable={{ copyValue: 'value', copiedLabel: 'Copied!' }}
      disabled={disabled}
    >
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Delete
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Delete' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem type="danger" disabled={disabled}>
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Select
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Select' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem type="select" disabled={disabled}>
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: withCheckbox
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'withCheckbox' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem prefixel={<Checkbox />} disabled={disabled}>
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Cascader Select
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Cascader Select' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem parent disabled={disabled}>
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: withSwitch
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'withSwitch' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem suffixel={<Switch />} disabled={disabled}>
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Label+Description
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Label+Description' },
  props: {
    text: figma.string('Text'),
    description: figma.boolean('Show Description', {
      true: 'Description',
      false: undefined,
    }),
    ...stateProp,
  },
  example: ({ text, description, disabled }) => (
    <ListItem size="large" description={description} disabled={disabled}>
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Tree menu 1 lvl
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Tree menu 1 lvl' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem indentLevel={1} disabled={disabled}>
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Tree menu 2 lvl
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Tree menu 2 lvl' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem indentLevel={2} disabled={disabled}>
      {text}
    </ListItem>
  ),
});

// =========================================================
// Content Type: Featured
// =========================================================

figma.connect(ListItem, FIGMA_URL, {
  variant: { 'Content Type': 'Featured' },
  props: {
    text: figma.string('Text'),
    ...stateProp,
  },
  example: ({ text, disabled }) => (
    <ListItem featured disabled={disabled}>
      {text}
    </ListItem>
  ),
});
