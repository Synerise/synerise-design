import React, { CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import Avatar from '@synerise/ds-avatar';
import type { AvatarProps } from '@synerise/ds-avatar';
import Badge, { BadgeWithLabel } from '@synerise/ds-badge';
import type { BadgeProps } from '@synerise/ds-badge';
import { theme } from '@synerise/ds-core';
import Icon, { FileM, IconProps } from '@synerise/ds-icon';

import { AVATAR_IMAGE } from '../../constants';
import {
  BOOLEAN_CONTROL,
  COLOR_CONTROL,
  NUMBER_CONTROL,
  controlFromOptionsArray,
  fixedWrapper200,
  fixedWrapper400,
} from '../../utils';
import { AVATAR_ARG_TYPES, STATUSES } from './constants';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  decorators: [fixedWrapper400],
  argTypes: {
    count: { ...NUMBER_CONTROL },
    offset: {
      control: false,
    },
    outlined: {
      ...BOOLEAN_CONTROL,
    },
    overflowCount: {
      ...NUMBER_CONTROL,
    },
    status: {
      ...controlFromOptionsArray('select', [...STATUSES]),
    },
    pulsing: {
      ...BOOLEAN_CONTROL,
    },
  },
} as Meta<BadgeProps>;

const ROW: CSSProperties = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Count badges. The default badge background is white; use `customColor` for an arbitrary colour.
 * (`status` turns a badge into a dot, so it is not used for count badges.)
 */
export const Standalone: StoryObj<BadgeProps> = {
  render: (args) => (
    <div
      style={{
        ...ROW,
        background: args.outlined ? theme.palette['grey-200'] : 'transparent',
        padding: '8px',
      }}
    >
      <Badge {...args} customColor={theme.palette['red-600']} />
      <Badge {...args} customColor={theme.palette['yellow-600']} />
      <Badge {...args} customColor={theme.palette['green-600']} />
      <Badge {...args} customColor={theme.palette['grey-500']} />
      <div
        style={{
          ...ROW,
          padding: '0 8px',
          minHeight: '34px',
          background: theme.palette['grey-200'],
        }}
      >
        <Badge
          {...args}
          style={{
            backgroundColor: theme.palette['white'],
            color: theme.palette['grey-400'],
          }}
        />
        <Badge
          {...args}
          style={{
            backgroundColor: 'transparent',
            color: theme.palette['white'],
          }}
        />
      </div>
    </div>
  ),
  args: {
    count: 1,
    outlined: false,
    overflowCount: 99,
  },
};

export const Dot: StoryObj<
  BadgeProps & {
    iconSize: number;
    iconColor: string;
  }
> = {
  decorators: [fixedWrapper200],
  parameters: {
    controls: {
      include: ['iconColor', 'iconSize'],
    },
  },
  render: ({ iconColor, iconSize }) => (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Badge dot>
        <Icon color={iconColor} size={iconSize} component={<FileM />} />
      </Badge>

      <Badge dot>
        <a style={{ marginTop: '10px', display: 'block' }} href="#">
          Link something
        </a>
      </Badge>
    </div>
  ),
  argTypes: {
    iconColor: { ...COLOR_CONTROL },
    iconSize: { ...NUMBER_CONTROL },
  },
  args: {
    iconColor: '#fcc600',
    iconSize: 30,
  },
};

export const Count: StoryObj<BadgeProps> = {
  decorators: [fixedWrapper200],
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Badge {...args}>
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'grey',
              borderRadius: '5px',
            }}
          />
        </Badge>

        <Badge
          {...args}
          count={
            <Icon
              component={<FileM />}
              size={24}
              color={theme.palette['red-600']}
            />
          }
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'grey',
              borderRadius: '5px',
            }}
          />
        </Badge>
      </div>
    );
  },
  args: {
    count: 5,
    outlined: false,
    overflowCount: 99,
  },
};

export const StatusDot: StoryObj<BadgeProps> = {
  render: ({ status }) => <BadgeWithLabel status={status}>test</BadgeWithLabel>,
  args: {
    status: 'active',
  },
};

export const StatusDotWithAvatar: StoryObj<
  Omit<BadgeProps, 'size'> & AvatarProps
> = {
  render: ({ status, size, shape }) => (
    <Badge status={status}>
      <Avatar size={size} shape={shape} src={AVATAR_IMAGE} hasStatus />
    </Badge>
  ),
  parameters: {
    controls: {
      include: ['size', 'shape', 'status'],
    },
  },
  argTypes: {
    size: {
      defaultValue: 'default',
      ...controlFromOptionsArray('select', [
        'extraLarge',
        'large',
        'default',
        'small',
      ]),
    },
    shape: {
      defaultValue: 'circle',
      ...controlFromOptionsArray('select', ['circle', 'square']),
    },
  },
  args: {
    status: 'active',
    shape: 'circle',
    size: 'medium',
  },
};

export const StatusDotPulsing: StoryObj<BadgeProps> = {
  parameters: {
    controls: {
      include: ['status'],
    },
  },
  render: (args) => <Badge {...args} pulsing={true} flag={true} />,
  args: {
    status: 'active',
  },
};

/**
 * `text` was removed from the Badge API — use `BadgeWithLabel` to render a dot + label.
 */
export const StatusDotPulsingWithLabel: StoryObj<BadgeProps> = {
  parameters: {
    controls: {
      include: ['status'],
    },
  },
  render: ({ status }) => (
    <BadgeWithLabel status={status} pulsing flag>
      Success
    </BadgeWithLabel>
  ),
  args: {
    status: 'active',
  },
};

export const StatusDotPulsingWithElement: StoryObj<BadgeProps> = {
  parameters: {
    controls: {
      include: ['status'],
    },
  },
  render: (args) => (
    <Badge {...args} pulsing={true} flag={true}>
      <div
        style={{
          width: '48px',
          height: '48px',
          background: 'grey',
          borderRadius: '5px',
        }}
      />
    </Badge>
  ),
  args: {
    status: 'active',
  },
};

export const StatusDotPulsingWithIcon: StoryObj<
  Pick<BadgeProps, 'status' | 'pulsing'> & Pick<IconProps, 'color' | 'size'>
> = {
  parameters: {
    controls: {
      include: ['status', 'color', 'size'],
    },
  },
  render: (args) => {
    const { color, size, ...badgeProps } = args;
    return (
      <Badge {...badgeProps} flag={true}>
        <Icon color={color} size={size} component={<FileM />} />
      </Badge>
    );
  },
  argTypes: {
    size: {
      description: 'Icon size',
      ...NUMBER_CONTROL,
    },
    color: {
      ...COLOR_CONTROL,
    },
  },
  args: {
    status: 'active',
    pulsing: true,
    color: '#6a7580',
    size: 24,
  },
};

export const StatusDotPulsingWithAvatar: StoryObj<
  Pick<BadgeProps, 'status' | 'pulsing'> & AvatarProps
> = {
  parameters: {
    controls: {
      include: ['status', 'size', 'shape', 'pulsing'],
    },
  },
  render: ({ status, pulsing, size, shape }) => {
    return (
      <Badge status={status} pulsing={pulsing} flag={true}>
        <Avatar
          size={size}
          shape={'circle' || shape}
          src={AVATAR_IMAGE}
          hasStatus
        />
      </Badge>
    );
  },
  argTypes: {
    ...AVATAR_ARG_TYPES,
  },
  args: {
    status: 'active',
    shape: 'circle',
    size: 'medium',
    pulsing: true,
  },
};
