import * as React from 'react';

import AvatarGroup from '@synerise/ds-avatar-group';
import { boolean, number, select, text } from '@storybook/addon-knobs';

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';
const groupSizes = ['small', 'medium', 'large'] as const;
const groupAvatars = [
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    src: imgSrc,
    initials: 'JN',
    status: 'active',
  },
  {
    tooltip: { name: 'Kamil Kowalski', email: 'email' },
    initials: 'KK',
    status: 'active',
  },
  {
    tooltip: { name: 'Adam Staszewski', email: 'email' },
    initials: 'AS',
    status: 'inactive',
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
    status: 'blocked',
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
  }
];


const stories = {
  default: (
    <div style={{padding: 24, backgroundColor: '#fff', display: 'flex', justifyContent: 'flex-start', width: 500}}>
      <AvatarGroup
        size={select('Set size', groupSizes, 'medium')}
        hasStatus={boolean('Has status', true)}
        numberOfVisibleUsers={number('Number of visible avatars', 5)}
        users={groupAvatars}
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
