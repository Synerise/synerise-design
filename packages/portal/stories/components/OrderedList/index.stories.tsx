import * as React from 'react';

import OrderedList from '@synerise/ds-ordered-list';
import { boolean, select } from '@storybook/addon-knobs';
import roman from '@sguest/roman-js'


const numberFormatter = (index: number) => `${index + 1}. `;
const indexFormatter = (index: number) => `${index + 91}. `;
const numberHundredFormatter = (index: number) => `${index + 991}. `;
const withZerosFormatter = (index: number) => `0${index + 1}. `;
const withLettersFormatter = (index: number) => `${String.fromCharCode(index+97).toLowerCase()}. `;
const romanFormatter = (index: number) => roman.toRoman(index);
const dashedFormatter = () => ` - `;
const squareFormatter = (square) => `${square}. `;
const formatterType = {
  number: numberFormatter,
  numbers: indexFormatter,
  hundred: numberHundredFormatter,
  zeros: withZerosFormatter,
  romanian: romanFormatter,
  letters: withLettersFormatter,
};
const formatterType1 = {
  dashed: dashedFormatter,
  square: squareFormatter,


};

const stories = {
  Ordered: () => {
    const withSubmenu = boolean('Set second level', false);
    const thirdLevel = boolean('Set third level', false);
    const formatter = select('Set formatter', formatterType, formatterType.numbers);
    console.log(formatter)
    const data = [
      {
        label: ' Type something',
      },
      {
        label: ' Type something',
      },
      {
        label: ' Type something ',
      },
      {
        label: ' Type something ',
        subMenu: withSubmenu
          ? [
            {
              label: ' Type something ',
            },
            {
              label: ' Type something ',
              subMenu: withSubmenu && thirdLevel
                ? [
                  {
                    label: ' Type something ',
                  },
                  {
                    label: ' Type something ',
                  },
                ]
                : undefined,
            },
          ]
          : undefined,
      },
      {
        label: ' Type something ',
      },
      {
        label: ' Type something',
      },
      {
        label: ' Type something',
      },
      {
        label: ' Type something ',
      },
      {
        label: ' Type something ',
      },
    ];

    return <OrderedList data={data} indexFormatter={formatter} />;
  },
  Unordered: () => {
    const withSubmenu = boolean('Set second level', false);
    const thirdLevel = boolean('Set third level', false);
    const formatter1 = select('Set formatter', formatterType1, formatterType1.dashed);
    console.log(formatter1)
    const data = [
      {
        label: 'Type something',
      },
      {
        label: 'Type something',
      },
      {
        label: 'Type something ',
      },
      {
        label: 'Type something ',
        subMenu: withSubmenu
          ? [
            {
              label: 'Type something ',
            },
            {
              label: 'Type something ',
              subMenu: withSubmenu && thirdLevel
                ? [
                  {
                    label: 'Type something ',
                  },
                  {
                    label: 'Type something ',
                  },
                ]
                : undefined,
            },
          ]
          : undefined,
      },
      {
        label: 'Type something ',
      },
      {
        label: 'Type something',
      },
      {
        label: 'Type something',
      },
      {
        label: 'Type something ',
      },
      {
        label: 'Type something ',
      },
    ];

    return <OrderedList data={data} indexFormatter={formatter1} />;
  },
};


export default {
  name: 'Components/OrderedList',
  config: {},
  stories,
};
