import * as React from 'react';

import AvatarGroup from '@synerise/ds-avatar-group';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { Avatar } from '@synerise/ds-avatar-group/dist/AvatarGroup';

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';
const groupSizes = ['small', 'medium', 'large'] as const;
const groupAvatars: Avatar[] = [
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
      src: imgSrc,
    },
    initials: 'JN',
    status: 'active',
  },
  {
    avatarProps: {
      tooltip: { name: 'Kamil Kowalski', email: 'email' },
      backgroundColor: 'red',
      backgroundColorHue: '800',
    },
    initials: 'KK',
    status: 'active',
  },
  {
    avatarProps: {
      tooltip: { name: 'Adam Staszewski', email: 'email' },
      backgroundColor: 'green',
      backgroundColorHue: '800',
    },
    initials: 'AS',
    status: 'inactive',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
      backgroundColor: 'blue',
      backgroundColorHue: '600',
    },
    initials: 'JN',
    status: 'blocked',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'JN',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'JN',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'JN',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'JN',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'JN',
  }
];


const stories = {
  default: () => (
    <div style={{padding: 24, backgroundColor: '#fff', display: 'flex', justifyContent: 'flex-start', width: 500}}>
      <AvatarGroup
        size={select('Set size', groupSizes, 'medium')}
        hasStatus={boolean('Has status', true)}
        numberOfVisibleUsers={number('Number of visible avatars', 5)}
        avatars={groupAvatars}
        moreInfoTooltip={text('More info tooltip copy', 'more users')}
      />
    </div>
  )
};

export default {
  name: 'Components|AvatarGroup',
  config: {},
  stories,
  Component: AvatarGroup,
}
