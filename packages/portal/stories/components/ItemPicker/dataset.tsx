import * as React from 'react';
import Icon, { LaptopM, MobileM } from '@synerise/ds-icon';
import Avatar from '@synerise/ds-avatar';
import DSFlag from '@synerise/ds-flag';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

export const dataSource = [
  {
    text: 'iPhone R',
    prefixel: <Icon component={<MobileM />} color={theme.palette['grey-600']} />,
  },
  {
    text: 'iPhone X',
    prefixel: (
      <Avatar src={imgSrc} size="small">
        M
      </Avatar>
    ),
  },
  {
    text: 'MacBook Pro 15',
    prefixel: <DSFlag country="US" />,
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
      <Avatar src={imgSrc} size="small">
        M
      </Avatar>
    ),
  },
  {
    text: 'MacBook Pro 15 2023',
    prefixel: <DSFlag country="US" />,
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
