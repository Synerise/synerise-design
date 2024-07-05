import React from 'react';
import { MenuItemProps } from '@synerise/ds-menu';
import Icon, { Add3M, FileM, LaptopM, MobileM, UserM } from '@synerise/ds-icon';
import Avatar from '@synerise/ds-avatar';
import { theme } from '@synerise/ds-core';
import Flag from '@synerise/ds-flag';

import { avatarImage } from '../../constants/images';

export const ICONS = {
  none: null,
  user: <Icon component={<UserM />} />,
  add: <Icon component={<Add3M />} />,
  file: <Icon component={<FileM />} />,
};

export const FLAT_DATA_SOURCE: MenuItemProps[] = [
  {
    text: 'iPhone R',
    prefixel: <Icon component={<MobileM />} color={theme.palette['grey-600']} />,
  },
  {
    text: 'iPhone X',
    prefixel: (
      <Avatar src={avatarImage} size="small">
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
    prefixel: <Icon component={<LaptopM />} color={theme.palette['grey-600']} />,
  },
  {
    text: 'iPad Air 3',
  },
  {
    text: 'iPhone 13',
    prefixel: <Icon component={<MobileM />} color={theme.palette['grey-600']} />,
  },
  {
    text: 'iPhone 14',
    prefixel: (
      <Avatar src={avatarImage} size="small">
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
