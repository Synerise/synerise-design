import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';

import type {
  AvatarProps,
  ObjectAvatarProps,
  UserAvatarProps,
} from '@synerise/ds-avatar';
import Avatar, {
  ObjectAvatar as ObjectAvatarComponent,
  UserAvatar as UserAvatarComponent,
} from '@synerise/ds-avatar';
import type { BadgeStatus } from '@synerise/ds-badge';
import Badge from '@synerise/ds-badge';
import Icon, { MailM, Thunder2M, UserCircleM } from '@synerise/ds-icon';
import type { SkeletonAvatarProps } from '@synerise/ds-skeleton';
import { SkeletonAvatar } from '@synerise/ds-skeleton';

import { AVATAR_IMAGE } from '../../constants';
import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  reactNodeAsSelect,
} from '../../utils';
import { STATUSES } from '../Badge/constants';
import { backgroundColors, shapes, sizes } from './constants';

const commonArgs = {
  tooltip: { title: 'Silvia Jobs', description: 'silvia.jobs@example.com' },
  useImage: true,
};
const colorOptions = backgroundColors.filter((color) => color !== 'auto');
const skeletonParameters = { controls: { include: ['size', 'shape'] } };
const skeletonSizeControl = controlFromOptionsArray('inline-radio', [
  'S',
  'M',
  'L',
  'XL',
]);
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

    disabled: BOOLEAN_CONTROL,
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
        Thunder2M: <Icon component={<Thunder2M />} />,
        UserCircleM: <Icon component={<UserCircleM />} />,
        MailM: <Icon component={<MailM />} />,
      }),
    },
  },
} as Meta<AvatarStoryType>;

export const Default: StoryObj<AvatarStoryType> = {
  render: ({ badgeStatus, useImage, ...args }) => (
    <Badge status={badgeStatus || 'active'}>
      <Avatar
        {...args}
        src={useImage ? AVATAR_IMAGE : undefined}
        iconComponent={args.iconComponent}
        hasStatus
      >
        JJ
      </Avatar>
    </Badge>
  ),
  parameters: { controls: { exclude: ['text'] } },
  argTypes: {
    backgroundColor: controlFromOptionsArray('select', colorOptions),
    useImage: BOOLEAN_CONTROL,
  },
  args: {
    ...commonArgs,
    useImage: true,
    iconComponent: <Icon component={<MailM />} />,
    badgeStatus: 'active',
  },
};

export const UserAvatar: StoryObj<UserAvatarProps> = {
  render: ({ user, ...args }) => (
    <UserAvatarComponent {...args} user={{ ...user }} />
  ),
  args: {
    ...commonArgs,
    text: 'JJ',
    user: {
      firstName: 'Silvia',
      lastName: 'Jobs',
      email: 'silvia.jobs@example.com',
      avatarId: '1234',
    },
  },
};

export const UserAvatarSkeleton: StoryObj<SkeletonAvatarProps> = {
  render: (args) => <SkeletonAvatar {...args} />,
  parameters: skeletonParameters,
  argTypes: { size: skeletonSizeControl },
  args: {
    size: 'M',
  },
};

export const ObjectAvatar: StoryObj<ObjectAvatarProps> = {
  render: (args) => <ObjectAvatarComponent {...args} />,
  argTypes: {
    color: controlFromOptionsArray('select', colorOptions),
  },
  args: {
    ...commonArgs,
    iconComponent: <Icon component={<Thunder2M />} />,
  },
};

export const ObjectAvatarSkeleton: StoryObj<SkeletonAvatarProps> = {
  render: (args) => <SkeletonAvatar {...args} />,
  parameters: skeletonParameters,
  argTypes: { size: skeletonSizeControl },
  args: {
    size: 'M',
    shape: 'square',
  },
};
