import * as React from 'react';
import { LaptopM, MobileM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Avatar from '@synerise/ds-avatar';
import DSFlag from '@synerise/ds-flag';

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

export const dataSource = [
  {
    text: 'iPhone R',
    prefixel: <Icon component={<MobileM />} />,
  },
  {
    text: 'iPhone X',
    prefixel: <Avatar src={imgSrc} size='small'>M</Avatar>,
  },
  {
    text: 'MacBook Pro 15',
    prefixel: <DSFlag country="US" />,
  },
  {
    text: 'MacBook Air 13',
    prefixel: <Avatar size="small" shape="square" backgroundColor='green'>E</Avatar>,
  },
  {
    text: 'Macbook Pro 15',
    prefixel: <Icon component={<LaptopM />} />,
  },
  {
    text: 'iPad Air 3'
  }
];
