import React from 'react';

import Avatar from '@synerise/ds-avatar';
import Flag from '@synerise/ds-flag';
import Icon, { Add3M, FileM, LaptopM, MobileM, UserM } from '@synerise/ds-icon';
import { type ListItemProps } from '@synerise/ds-list-item';

import { AVATAR_IMAGE } from '../../constants/images';

export const ICONS = {
  none: null,
  user: <Icon component={<UserM />} />,
  add: <Icon component={<Add3M />} />,
  file: <Icon component={<FileM />} />,
};

export const FLAT_DATA_SOURCE: ListItemProps[] = [
  {
    text: 'iPhone R',
    prefixel: (
      <Icon component={<MobileM />} color="var(--ds-color-icon-base-default)" />
    ),
  },
  {
    text: 'iPhone X',
    prefixel: (
      <Avatar src={AVATAR_IMAGE} size="small">
        M
      </Avatar>
    ),
  },
  {
    text: 'MacBook Pro 15',
    prefixel: <Flag country="US" />,
  },
  {
    text: 'MacBook Air 13',
    prefixel: (
      <Avatar size="small" shape="square" backgroundColor="green">
        E
      </Avatar>
    ),
  },
  {
    text: 'Macbook Pro 15',
    prefixel: (
      <Icon component={<LaptopM />} color="var(--ds-color-icon-base-default)" />
    ),
  },
  {
    text: 'iPad Air 3',
  },
  {
    text: 'iPhone 13',
    prefixel: (
      <Icon component={<MobileM />} color="var(--ds-color-icon-base-default)" />
    ),
  },
  {
    text: 'iPhone 14',
    prefixel: (
      <Avatar src={AVATAR_IMAGE} size="small">
        M
      </Avatar>
    ),
  },
  {
    text: 'MacBook Pro 15 2023',
    prefixel: <Flag country="US" />,
  },
  {
    text: 'MacBook Air 13 2023',
    prefixel: (
      <Avatar size="small" shape="square" backgroundColor="green">
        E
      </Avatar>
    ),
  },
  {
    text: 'iPad Pro',
  },
];
