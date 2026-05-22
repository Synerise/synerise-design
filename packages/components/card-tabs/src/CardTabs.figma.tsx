import figma from '@figma/code-connect';

import CardTab from './CardTab/CardTab';
import { prefixType } from './CardTab/CardTab.types';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=372-9120&m=dev';

const sharedProps = {
  name: figma.string('✏️Text'),
  greyBackground: figma.enum('Background', {
    Grey: false,
    White: true,
  }),
};

// =========================================================
// Prefix: Tag
// =========================================================

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Tag', State: 'Default' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.TAG}
      tag="A"
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Tag', State: 'Active' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.TAG}
      tag="A"
      active
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Tag', State: 'Validate' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.TAG}
      tag="A"
      invalid
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Tag', State: 'Validate Active' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.TAG}
      tag="A"
      active
      invalid
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Tag', State: 'Disabled' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.TAG}
      tag="A"
      disabled
      greyBackground={greyBackground}
    />
  ),
});

// =========================================================
// Prefix: Color dot
// =========================================================

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Color dot', State: 'Default' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.DOT}
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Color dot', State: 'Active' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.DOT}
      active
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Color dot', State: 'Validate' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.DOT}
      invalid
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Color dot', State: 'Validate Active' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.DOT}
      active
      invalid
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Color dot', State: 'Disabled' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.DOT}
      disabled
      greyBackground={greyBackground}
    />
  ),
});

// =========================================================
// Prefix: Icon
// =========================================================

const iconProps = {
  ...sharedProps,
  prefixIcon: figma.instance('Icon'),
};

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Icon', State: 'Default' },
  props: iconProps,
  example: ({ name, greyBackground, prefixIcon }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.ICON}
      prefixIcon={prefixIcon}
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Icon', State: 'Active' },
  props: iconProps,
  example: ({ name, greyBackground, prefixIcon }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.ICON}
      prefixIcon={prefixIcon}
      active
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Icon', State: 'Validate' },
  props: iconProps,
  example: ({ name, greyBackground, prefixIcon }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.ICON}
      prefixIcon={prefixIcon}
      invalid
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Icon', State: 'Validate Active' },
  props: iconProps,
  example: ({ name, greyBackground, prefixIcon }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.ICON}
      prefixIcon={prefixIcon}
      active
      invalid
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Icon', State: 'Disabled' },
  props: iconProps,
  example: ({ name, greyBackground, prefixIcon }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.ICON}
      prefixIcon={prefixIcon}
      disabled
      greyBackground={greyBackground}
    />
  ),
});

// =========================================================
// Prefix: Handler
// =========================================================

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Handler', State: 'Default' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.HANDLE}
      draggable
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Handler', State: 'Active' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.HANDLE}
      draggable
      active
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Handler', State: 'Validate' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.HANDLE}
      draggable
      invalid
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Handler', State: 'Validate Active' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.HANDLE}
      draggable
      active
      invalid
      greyBackground={greyBackground}
    />
  ),
});

figma.connect(CardTab, FIGMA_URL, {
  variant: { Prefix: 'Handler', State: 'Disabled' },
  props: sharedProps,
  example: ({ name, greyBackground }) => (
    <CardTab
      id={1}
      name={name}
      prefix={prefixType.HANDLE}
      draggable
      disabled
      greyBackground={greyBackground}
    />
  ),
});
