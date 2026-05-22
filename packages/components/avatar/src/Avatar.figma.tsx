import figma from '@figma/code-connect';

import ObjectAvatar from './ObjectAvatar/ObjectAvatar';
import UserAvatar from './UserAvatar/UserAvatar';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=252-4297&m=dev';

// =========================================================
// Type: User → UserAvatar
// =========================================================

figma.connect(UserAvatar, FIGMA_URL, {
  variant: { Type: 'User', 'Content Type': 'Icon' },
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Extra Large': 'extraLarge',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
      Default: undefined,
      Hover: undefined,
    }),
    icon: figma.instance('Icon'),
  },
  example: ({ size, disabled, icon }) => (
    <UserAvatar size={size} disabled={disabled} iconComponent={icon} />
  ),
});

figma.connect(UserAvatar, FIGMA_URL, {
  variant: { Type: 'User', 'Content Type': 'Image' },
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Extra Large': 'extraLarge',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
      Default: undefined,
      Hover: undefined,
    }),
  },
  example: ({ size, disabled }) => (
    <UserAvatar
      size={size}
      disabled={disabled}
      user={{ avatar: 'https://example.com/photo.jpg' }}
    />
  ),
});

figma.connect(UserAvatar, FIGMA_URL, {
  variant: { Type: 'User', 'Content Type': 'Text' },
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Extra Large': 'extraLarge',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
      Default: undefined,
      Hover: undefined,
    }),
  },
  example: ({ size, disabled }) => (
    <UserAvatar
      size={size}
      disabled={disabled}
      user={{ firstName: 'Brad', lastName: 'Garrett' }}
    />
  ),
});

// =========================================================
// Type: Object → ObjectAvatar
// =========================================================

figma.connect(ObjectAvatar, FIGMA_URL, {
  variant: { Type: 'Object', 'Content Type': 'Icon' },
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Extra Large': 'extraLarge',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
      Default: undefined,
      Hover: undefined,
    }),
    icon: figma.instance('Icon'),
  },
  example: ({ size, disabled, icon }) => (
    <ObjectAvatar size={size} disabled={disabled} iconComponent={icon} />
  ),
});

figma.connect(ObjectAvatar, FIGMA_URL, {
  variant: { Type: 'Object', 'Content Type': 'Image' },
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Extra Large': 'extraLarge',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
      Default: undefined,
      Hover: undefined,
    }),
  },
  example: ({ size, disabled }) => (
    <ObjectAvatar
      size={size}
      disabled={disabled}
      object={{ avatar: 'https://example.com/item.jpg' }}
    />
  ),
});

figma.connect(ObjectAvatar, FIGMA_URL, {
  variant: { Type: 'Object', 'Content Type': 'Text' },
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Extra Large': 'extraLarge',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
      Default: undefined,
      Hover: undefined,
    }),
  },
  example: ({ size, disabled }) => (
    <ObjectAvatar size={size} disabled={disabled} object={{ name: 'Widget' }} />
  ),
});
