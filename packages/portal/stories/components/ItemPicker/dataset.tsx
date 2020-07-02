import * as React from 'react';
import { LaptopM, MobileM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';

export const dataSource = [
  {
    text: 'iPhone R',
    prefixel: <Icon component={<MobileM />} />,
  },
  {
    text: 'iPhone X',
    prefixel: <Icon component={<MobileM />} />,
  },
  {
    text: 'MacBook Pro 15',
    prefixel: <Icon component={<LaptopM />} />,
  },
  {
    text: 'MacBook Air 13',
    prefixel: <Icon component={<LaptopM />} />,
  },
  {
    text: 'iPhone XS',
    prefixel: <Icon component={<MobileM />} />,
  }
];
