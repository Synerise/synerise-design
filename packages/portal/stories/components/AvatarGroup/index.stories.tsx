import * as React from 'react';

import AvatarGroup from '@synerise/ds-avatar-group';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { Avatar } from '@synerise/ds-avatar-group/dist/AvatarGroup';

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';
const groupSizes = ['small', 'medium', 'large'] as const;
const groupAvatars: Avatar[] = [
  {
    avatarProps: {
      tooltip: { name: 'Kamil Kowalski', email: 'email' },
      backgroundColor: 'blue',
      backgroundColorHue: '600',
    },
    initials: 'KK',
    status: 'active',
  },
  {
    avatarProps: {
      tooltip: { name: 'Adam Staszewski', email: 'email' },
      backgroundColor: 'green',
      backgroundColorHue: '600',
    },
    initials: 'AS',
    status: 'inactive',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
      backgroundColor: 'orange',
      backgroundColorHue: '600',
    },
    initials: 'JN',
    status: 'blocked',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
      backgroundColor: 'red',
      backgroundColorHue: '600',
    },
    initials: 'JN',
    status: 'active',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
      backgroundColor: 'violet',
      backgroundColorHue: '600',
    },
    initials: 'JN',
    status: 'inactive',
  }
];


const stories = {
  avatarGroup: () => (
    <div style={{padding: 24, backgroundColor: '#fff', display: 'flex', justifyContent: 'flex-start', width: 500}}>
      <AvatarGroup
        size={select('Set size', groupSizes, 'medium')}
        hasStatus={boolean('Has status', true)}
        numberOfVisibleUsers={number('Number of visible avatars', 3)}
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
