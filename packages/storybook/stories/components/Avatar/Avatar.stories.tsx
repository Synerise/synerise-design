import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Avatar, {
  ObjectAvatar as ObjectAvatarComponent,
  UserAvatar as UserAvatarComponent,
} from '@synerise/ds-avatar';
import type {
  AvatarProps,
  ObjectAvatarProps,
  UserAvatarProps,
} from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import type { BadgeStatus } from '@synerise/ds-badge';
import Icon, { MailM, Thunder2M, UserCircleM } from '@synerise/ds-icon';
import { SkeletonAvatar } from '@synerise/ds-skeleton';
import type { SkeletonAvatarProps } from '@synerise/ds-skeleton';

import { AVATAR_IMAGE } from '../../constants';
import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  reactNodeAsSelect,
} from '../../utils';
import { STATUSES } from '../Badge/constants';
import { backgroundColors, shapes, sizes } from './constants';

const commonArgs = {
  tooltip: { title: 'Silvia Jobs', description: 'silvia.jobs@gmail.com' },
  useImage: true,
};
type AvatarStoryType = AvatarProps & {
  useImage: boolean;
  useIcon: Boolean;
  badgeStatus: BadgeStatus;
};

export default {
  title: 'Components/Avatar/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      ...controlFromOptionsArray('inline-radio', sizes),

      defaultValue: 'medium',
    },
    backgroundColor: {
      ...controlFromOptionsArray('select', backgroundColors),

      defaultValue: 'grey',
    },
    shape: {
      ...controlFromOptionsArray('inline-radio', [...shapes]),
      defaultValue: 'circle',
    },
    badgeStatus: {
      ...controlFromOptionsArray('select', [...STATUSES]),
      defaultValue: 'active',
    },

    avatar: {
      ...BOOLEAN_CONTROL,
      defaultValue: false,
    },
    text: {
      control: 'text',
      defaultValue: '',
    },
    tooltip: {
      control: 'object',
      defaultValue: { title: '', description: '' },
    },
    onClick: fn,
    onError: fn,

    iconComponent: {
      ...reactNodeAsSelect(['none', 'UserCircleM', 'MailM', 'Thunder2M'], {
        none: null,
        Thunder2M: <Icon component={<Thunder2M />} color="#ffffff" />,
        UserCircleM: <Icon component={<UserCircleM />} color="#ffffff" />,
        MailM: <Icon component={<MailM />} color="#ffffff" />,
      }),
    },
  },
} as Meta<AvatarStoryType>;

export const Default: StoryObj<AvatarStoryType> = {
  render: ({ badgeStatus, ...args }) => (
    <Badge status={badgeStatus || 'active'}>
      <Avatar
        {...args}
        src={args.useImage ? AVATAR_IMAGE : undefined}
        iconComponent={args.iconComponent}
        hasStatus
      >
        JJ
      </Avatar>
    </Badge>
  ),
  args: {
    ...commonArgs,
    iconComponent: <Icon component={<MailM />} color="#fff" />,
    badgeStatus: 'active',
  },
};

export const UserAvatar: StoryObj<UserAvatarProps> = {
  render: (args) => <UserAvatarComponent {...args} />,
  args: {
    ...commonArgs,
    text: 'JJ',
  },
};

export const UserAvatarSkeleton: StoryObj<SkeletonAvatarProps> = {
  render: (args) => <SkeletonAvatar {...args} />,
  args: {
    size: 'M',
  },
};

export const ObjectAvatar: StoryObj<ObjectAvatarProps> = {
  render: (args) => <ObjectAvatarComponent {...args} />,
  args: {
    ...commonArgs,
    iconComponent: <Icon component={<Thunder2M />} color="#fff" />,
  },
};

export const ObjectAvatarSkeleton: StoryObj<SkeletonAvatarProps> = {
  render: (args) => <SkeletonAvatar {...args} />,
  args: {
    size: 'M',
    shape: 'square',
  },
};
