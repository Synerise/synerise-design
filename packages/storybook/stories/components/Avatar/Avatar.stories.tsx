import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Avatar, { ObjectAvatar as ObjectAvatarComponent, UserAvatar as UserAvatarComponent } from '@synerise/ds-avatar';
import type { AvatarProps, ObjectAvatarProps, UserAvatarProps } from '@synerise/ds-avatar';

import { SkeletonAvatar } from '@synerise/ds-skeleton';
import type { SkeletonAvatarProps } from '@synerise/ds-skeleton';

import Badge from '@synerise/ds-badge';
import type { BadgeStatus } from '@synerise/ds-badge';
import Icon, { MailM, Thunder2M, UserCircleM } from '@synerise/ds-icon';

import { sizes, shapes, backgroundColors } from './constants';
import { statuses } from '../Badge/constants';
import { reactNodeAsSelect, controlFromOptionsArray } from '../../utils';
import { avatarImage } from '../../constants/images'

export default {
  title: 'Components/Avatar/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { 
        ...controlFromOptionsArray('select', sizes.map(size => size.toLowerCase()))
      },
      defaultValue: 'medium',
    },
    backgroundColor: {
      control: { 
        ...controlFromOptionsArray('select', backgroundColors.map(color => color.toLowerCase()))
      },
      defaultValue: 'grey',
    },
    shape: {
      ...controlFromOptionsArray('select', [...shapes]),
      defaultValue: 'circle',
    },
    badgeStatus: {
      ...controlFromOptionsArray('select', [...statuses]),
      defaultValue: 'active',
    },
    
    avatar: {
      control: 'boolean',
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
      ...reactNodeAsSelect(
        ['none', 'UserCircleM', 'MailM', 'Thunder2M'], 
        {
          none: null,
          Thunder2M: <Icon component={<Thunder2M />} color='#ffffff' />,
          UserCircleM: <Icon component={<UserCircleM />} color='#ffffff' />,
          MailM: <Icon component={<MailM />} color='#ffffff' />
        }
      ),
    },
  },
} as Meta<AvatarProps>;

const commonArgs = {
  tooltip: { title: 'Silvia Jobs', description: 'silvia.jobs@gmail.com' },
};
type AvatarStoryType = AvatarProps & {
  useImage: boolean;
  useIcon: Boolean;
  badgeStatus: BadgeStatus
}
export const Default: StoryObj<AvatarStoryType> = {
  render: (args) => (
    <Badge status={args.badgeStatus || 'active'}>
      <Avatar
        {...args}
        src={args.useImage ? avatarImage : undefined}
        iconComponent={args.iconComponent}
        hasStatus
      >JJ</Avatar>
    </Badge>
  ),
  args: {
    ...commonArgs,
    iconComponent: <Icon component={<MailM />} color='#fff' />,
    badgeStatus: 'active',
  },
};


export const UserAvatar: StoryObj<UserAvatarProps> = {
  render: (args) => (
    <UserAvatarComponent
      {...args}
    />
  ),
  args: {
    ...commonArgs,
    text: 'JJ'
  },
};

export const UserAvatarSkeleton: StoryObj<SkeletonAvatarProps> = {
  render: (args) => <SkeletonAvatar {...args} />,
  args: {
    size: 'M',
  },
};



export const ObjectAvatar: StoryObj<ObjectAvatarProps> = {
  render: (args) => (
    <ObjectAvatarComponent
      {...args}
    />
  ),
  args: {
    ...commonArgs,
    iconComponent: <Icon component={<Thunder2M />} color='#fff' />,
  },
};



export const ObjectAvatarSkeleton: StoryObj<SkeletonAvatarProps> = {
  render: (args) => <SkeletonAvatar {...args} />,
  args: {
    size: 'M',
    shape: 'square',
  },
};