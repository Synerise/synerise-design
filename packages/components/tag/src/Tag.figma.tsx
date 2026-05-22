// @ts-nocheck
import figma from '@figma/code-connect';

import Tag from './Tag';
import { TagShape } from './Tag.types';

const TAG_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=366-7645&m=dev';

figma.connect(Tag, TAG_URL, {
  variant: { Content: 'Single Character', State: 'Default' },
  props: {
    name: figma.string('Text'),
    shape: figma.enum('Shape', {
      Rounded: TagShape.SINGLE_CHARACTER_ROUND,
      Square: TagShape.SINGLE_CHARACTER_SQUARE,
    }),
    color: figma.enum('Color', {
      Color: '#5A32FB',
      Gray: undefined,
    }),
  },
  example: ({ name, shape, color }) => (
    <Tag name={name} shape={shape} color={color} />
  ),
});

figma.connect(Tag, TAG_URL, {
  variant: { Content: 'Single Character', State: 'Disabled' },
  props: {
    name: figma.string('Text'),
    shape: figma.enum('Shape', {
      Rounded: TagShape.SINGLE_CHARACTER_ROUND,
      Square: TagShape.SINGLE_CHARACTER_SQUARE,
    }),
    color: figma.enum('Color', {
      Color: '#5A32FB',
      Gray: undefined,
    }),
  },
  example: ({ name, shape, color }) => (
    <Tag name={name} shape={shape} color={color} disabled />
  ),
});

figma.connect(Tag, TAG_URL, {
  variant: { Content: 'Text', State: 'Default' },
  props: {
    name: figma.string('Text 2'),
    shape: figma.enum('Shape', {
      Rounded: TagShape.DEFAULT_ROUND,
      Square: TagShape.DEFAULT_SQUARE,
    }),
    color: figma.enum('Color', {
      Color: '#5A32FB',
      Gray: undefined,
    }),
  },
  example: ({ name, shape, color }) => (
    <Tag name={name} shape={shape} color={color} />
  ),
});

figma.connect(Tag, TAG_URL, {
  variant: { Content: 'Text', State: 'Disabled' },
  props: {
    name: figma.string('Text 2'),
    shape: figma.enum('Shape', {
      Rounded: TagShape.DEFAULT_ROUND,
      Square: TagShape.DEFAULT_SQUARE,
    }),
    color: figma.enum('Color', {
      Color: '#5A32FB',
      Gray: undefined,
    }),
  },
  example: ({ name, shape, color }) => (
    <Tag name={name} shape={shape} color={color} disabled />
  ),
});

figma.connect(Tag, TAG_URL, {
  variant: { Content: 'Icon+Text', State: 'Default' },
  props: {
    name: figma.string('Text 2'),
    shape: figma.enum('Shape', {
      Rounded: TagShape.DEFAULT_ROUND,
      Square: TagShape.DEFAULT_SQUARE,
    }),
    color: figma.enum('Color', {
      Color: '#5A32FB',
      Gray: undefined,
    }),
    prefixel: figma.instance('Icon'),
  },
  example: ({ name, shape, color, prefixel }) => (
    <Tag name={name} shape={shape} color={color} prefixel={prefixel} />
  ),
});

figma.connect(Tag, TAG_URL, {
  variant: { Content: 'Icon+Text', State: 'Disabled' },
  props: {
    name: figma.string('Text 2'),
    shape: figma.enum('Shape', {
      Rounded: TagShape.DEFAULT_ROUND,
      Square: TagShape.DEFAULT_SQUARE,
    }),
    color: figma.enum('Color', {
      Color: '#5A32FB',
      Gray: undefined,
    }),
    prefixel: figma.instance('Icon'),
  },
  example: ({ name, shape, color, prefixel }) => (
    <Tag name={name} shape={shape} color={color} prefixel={prefixel} disabled />
  ),
});

figma.connect(Tag, TAG_URL, {
  variant: { Content: 'Badge+Text+Badge', State: 'Default' },
  props: {
    name: figma.string('Text 2'),
    shape: figma.enum('Shape', {
      Rounded: TagShape.DEFAULT_ROUND,
      Square: TagShape.DEFAULT_SQUARE,
    }),
    color: figma.enum('Color', {
      Color: '#5A32FB',
      Gray: undefined,
    }),
  },
  example: ({ name, shape, color }) => (
    <Tag name={name} shape={shape} color={color} prefixel={1} suffixel={1} />
  ),
});

figma.connect(Tag, TAG_URL, {
  variant: { Content: 'Badge+Text+Badge', State: 'Disabled' },
  props: {
    name: figma.string('Text 2'),
    shape: figma.enum('Shape', {
      Rounded: TagShape.DEFAULT_ROUND,
      Square: TagShape.DEFAULT_SQUARE,
    }),
    color: figma.enum('Color', {
      Color: '#5A32FB',
      Gray: undefined,
    }),
  },
  example: ({ name, shape, color }) => (
    <Tag
      name={name}
      shape={shape}
      color={color}
      prefixel={1}
      suffixel={1}
      disabled
    />
  ),
});
