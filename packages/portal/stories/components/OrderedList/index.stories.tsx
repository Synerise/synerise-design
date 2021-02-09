import * as React from 'react';

import OrderedList from '@synerise/ds-ordered-list';
import { boolean, select } from '@storybook/addon-knobs';
import Icon from '@synerise/ds-icon';
import { Add3M } from '@synerise/ds-icon/dist/icons';



const indexFormatter = (index: number) => `${index + 90}. `;
const withZerosFormatter = (index: number) => `0-${index}. `;
const formatterType = {
  numbers: indexFormatter,
  zeros: withZerosFormatter
};
const number = [{ label: '1. ' }, { label: '2. ' }, { label: '3. ' }, { label: '4. ' }];
const withZeros = [{ label: '01. ' }, { label: '02. ' }, { label: '03. ' }, { label: '04. ' }];
const withLetters = [{ label: 'a. ' }, { label: 'b. ' }, { label: 'c. ' }, { label: 'd. ' }];
const withRomanian = [{ label: 'I. ' }, { label: 'II. ' }, { label: 'III. ' }, { label: 'IV. ' }];

const stories = {
  Ordered: () => {
    const withSubmenu = boolean('Set submen', false);
    const formatter = select('Set formatter', formatterType, formatterType.numbers);
    console.log(formatter)
    const data = [
      {
        label: 'Type something 1',
      },
      {
        label: 'Type something 2',
        subMenu: withSubmenu
          ? [
              {
                label: 'Type nested 1',
              },
              {
                label: 'Type nested 2',
              },
            ]
          : undefined,
      },
      {
        label: 'Type something 3',
        prefixel: <Icon component={<Add3M />} />,
      },
      {
        label: 'Type something 4',
        suffixel: <Icon component={<Add3M />} />,
      },
      {
        label: 'Type something 5',
        subMenu: withSubmenu
          ? [
              {
                label: 'Type nested 1',
              },
              {
                label: 'Type nested 2',
              },
            ]
          : undefined,
      },
    ];

    return <OrderedList data={data} indexFormatter={formatter} />;
  },
};

export default {
  name: 'Components/OrderedList',
  config: {},
  stories,
};
