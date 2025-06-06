import * as React from 'react';
import { OrderedListItem } from '@synerise/ds-ordered-list';
import Icon, { Check3S, CheckS, Close3S } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';

export const LIST_DATA: OrderedListItem[] = [
  {
    id: '0',
    index: 0,
    label: 'Icons List level 1',
  },
  {
    id: '1',
    index: 1,
    label: 'Icons List level 1',
  },
  {
    id: '2',
    index: 2,
    label: 'Icons List level 1',
  },
  {
    id: '3',
    index: 3,
    label: 'Icons List level 1',
    subMenu: [
      {
        id: '4',
        index: 4,
        label: 'Icons List level 2',
      },
      {
        id: '5',
        index: 5,
        label: 'Icons List level 2',
        subMenu: [
          {
            id: '6',
            index: 6,
            label: 'Icons List level 3',
          },
          {
            id: '7',
            index: 7,
            label: 'Icons List level 3',
          },
        ],
      },
    ],
  },
  {
    id: '8',
    index: 8,
    label: 'Icons List level 1',
  },
  {
    id: '9',
    index: 9,
    label: 'Icons List level 1',
  },
  {
    id: '10',
    index: 10,
    label: 'Icons List level 1',
  },
  {
    id: '11',
    index: 11,
    label: 'Icons List level 1',
  },
  {
    id: '12',
    index: 12,
    label: 'Icons List level 1',
  },
];

export const emptyFormatter = { empty: () => ``,}


export const FORMATTERS = {
    CheckS: () => <Icon size={20} style={{marginRight: '4px', marginLeft: '-3px'}} color={theme.palette['grey-600']} component={<CheckS />} />,
    Close3S: () => <Icon size={20} style={{marginRight: '4px', marginLeft: '-3px'}} color={theme.palette['red-600']} component={<Close3S />} />,
    Check3S: () => <Icon size={20} style={{marginRight: '4px', marginLeft: '-3px'}} color={theme.palette['green-600']} component={<Check3S />} />,
    Emoji: () => <Icon size={20} style={{marginLeft: '1px'}}  component='👉' />
};