import React, { CSSProperties } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Badge, { IconBadge } from '@synerise/ds-badge';
import Icon, { AppleFillM, Close3M, ErrorFillM, FacebookFillM, FileM, HelpFillM, IconProps } from '@synerise/ds-icon';
import Avatar from '@synerise/ds-avatar';
import { theme } from '@synerise/ds-core';

import type { BadgeProps, CustomIconBadgeProps, StatusIconBadgeProps } from '@synerise/ds-badge';
import type { AvatarProps } from '@synerise/ds-avatar';

import {
  BOOLEAN_CONTROL,
  COLOR_CONTROL,
  COLOR_HUE_CONTROL,
  controlFromOptionsArray,
  fixedWrapper200,
  fixedWrapper400,
  NUMBER_CONTROL,
  reactNodeAsSelect,
  STRING_CONTROL,
} from '../../utils';
import { AVATAR_IMAGE, COLOR_NAMES } from '../../constants';

import { STATUSES, AVATAR_ARG_TYPES } from './constants';

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
    showZero: {
      ...BOOLEAN_CONTROL,
    },
    title: {
      ...STRING_CONTROL,
    },
    status: {
      ...controlFromOptionsArray('select', [...STATUSES]),
    },
    pulsing: {
      ...BOOLEAN_CONTROL,
    },
    backgroundColor: {
      ...controlFromOptionsArray('select', COLOR_NAMES),
    },
    textColor: {
      ...COLOR_CONTROL,
    },
    backgroundColorHue: {
      ...COLOR_HUE_CONTROL,
    },
    textColorHue: {
      ...COLOR_HUE_CONTROL,
    },
  },
} as Meta<BadgeProps>;

export const Standalone: StoryObj<BadgeProps> = {
  render: args => {
    return (
      <>
        <div
          style={{
            display: 'flex',
            background: args.outlined ? theme.palette['grey-200'] : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Badge
            backgroundColor="red"
            {...args}
            style={{
              margin: '0 6px 0 6px',
            }}
          />
          <Badge
            backgroundColor="yellow"
            backgroundColorHue="600"
            {...args}
            style={{
              margin: '0 6px 0 6px',
              alignItems: 'center',
            }}
          />
          <Badge
            backgroundColor="green"
            backgroundColorHue="600"
            {...args}
            style={{
              margin: '0 6px 0 6px',
              alignItems: 'center',
            }}
          />
          <Badge
            backgroundColor="grey"
            backgroundColorHue="500"
            {...args}
            style={{
              margin: '0 4px 0 6px',
              alignItems: 'center',
            }}
          />
          <div
            style={{
              minWidth: '34px',
              minHeight: '34px',
              background: theme.palette['grey-200'],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Badge
              backgroundColor="white"
              textColor="grey"
              textColorHue="500"
              {...args}
              style={{
                boxShadow: args.outlined ? `0 0 0 1px ${theme.palette['grey-500']}` : '',
                minWidth: '16px',
                minHeight: '16px',
                margin: '9px 8px 7px 8px',
                alignItems: 'center',
              }}
            />
            <Badge
              backgroundColor="transparent"
              textColor="white"
              {...args}
              style={{
                margin: '0 11px 0 4px',
                alignItems: 'center',
              }}
            />
          </div>
        </div>
      </>
    );
  },
  args: {
    count: 1,
    outlined: false,
    overflowCount: 99,
    showZero: false,
    title: 'text',
    textColor: 'white',
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
        <Icon color={'#fcc600' || iconColor} size={iconSize} component={<FileM />} />
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
    iconColor: '#6a7580',
    iconSize: 30,
  },
};

export const Count: StoryObj<BadgeProps> = {
  decorators: [fixedWrapper200],
  render: args => {
    const iconStyles: CSSProperties = {
      position: 'absolute',
      top: '14px',
      right: '2px',
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
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

        <Badge {...args} count={<Icon component={<FileM />} size={24} color="#f5222d" style={iconStyles} />}>
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'grey',
              borderRadius: '5px',
              margin: '10px 0 10px 10px',
            }}
          />
        </Badge>
      </div>
    );
  },
  args: {
    count: 5,
    title: 'Title',
    showZero: false,
    outlined: false,
    overflowCount: 99,
  },
};

export const StatusDot: StoryObj<BadgeProps> = {
  render: ({ status }) => <Badge status={status} text="test" />,
  args: {
    status: 'active',
  },
};

export const StatusDotWithAvatar: StoryObj<Omit<BadgeProps, 'size'> & AvatarProps> = {
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
      ...controlFromOptionsArray('select', ['extraLarge', 'large', 'default', 'small']),
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

export const StatusIconWithAvatar: StoryObj<StatusIconBadgeProps & AvatarProps> = {
  parameters: {
    controls: {
      include: ['shape', 'size', 'status'],
    },
  },
  render: ({ status, size, shape }) => (
    <IconBadge status={status}>
      <Avatar size={size} shape={shape} src={AVATAR_IMAGE} hasStatus />
    </IconBadge>
  ),
  args: {
    status: 'active',
    shape: 'circle',
    size: 'medium',
  },
};

export const CustomIconWithAvatar: StoryObj<CustomIconBadgeProps & AvatarProps> = {
  parameters: {
    controls: {
      include: ['shape', 'size', 'icon'],
    },
  },
  render: ({ icon, size, shape }) => (
    <IconBadge icon={icon}>
      <Avatar size={size} shape={shape} src={AVATAR_IMAGE} hasStatus />
    </IconBadge>
  ),
  argTypes: {
    ...AVATAR_ARG_TYPES,
    icon: {
      ...reactNodeAsSelect(['AppleFillM', 'Close3M', 'ErrorFillM', 'FacebookFillM', 'HelpFillM'], {
        AppleFillM: <Icon component={<AppleFillM />} color={theme.palette['fern-600']} />,
        Close3M: <Icon component={<Close3M />} color={theme.palette['grey-400']} />,
        ErrorFillM: <Icon component={<ErrorFillM />} color={theme.palette['red-600']} />,
        HelpFillM: <Icon component={<HelpFillM />} color={theme.palette['orange-600']} />,
        FacebookFillM: <Icon component={<FacebookFillM />} color={theme.palette['blue-600']} />,
      }),
    },
  },
  args: {
    icon: <Icon component={<HelpFillM />} color={theme.palette['orange-600']} />,
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
  render: args => <Badge {...args} pulsing={true} flag={true} />,
  args: {
    status: 'active',
  },
};

export const StatusDotPulsingWithLabel: StoryObj<BadgeProps> = {
  parameters: {
    controls: {
      include: ['status'],
    },
  },
  render: args => <Badge {...args} text={'Success'} pulsing={true} flag={true} />,
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
  render: args => (
    <Badge {...args} pulsing={true} flag={true}>
      <div style={{ width: '48px', height: '48px', background: 'grey', borderRadius: '5px' }} />
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
  render: args => {
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

export const StatusDotPulsingWithAvatar: StoryObj<Pick<BadgeProps, 'status' | 'pulsing'> & AvatarProps> = {
  parameters: {
    controls: {
      include: ['status', 'size', 'shape', 'pulsing'],
    },
  },
  render: ({ status, pulsing, size, shape }) => {
    return (
      <Badge status={status} pulsing={pulsing} flag={true}>
        <Avatar size={size} shape={'circle' || shape} src={AVATAR_IMAGE} hasStatus />
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
