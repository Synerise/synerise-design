import * as React from 'react';

import OrderedList from '@synerise/ds-ordered-list';
import { select } from '@storybook/addon-knobs';
import Icon from '@synerise/ds-icon';
import CheckS from '@synerise/ds-icon/dist/icons/CheckS';
import Close3S from '@synerise/ds-icon/dist/icons/Close3S';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Check3S from '@synerise/ds-icon/dist/icons/Check3S';


const emptyFormatter = () => ``;
const dashedFormatter = () => ` - `;
const formatterUnorderedType = {
  empty: emptyFormatter,
  dashed: dashedFormatter,
};

const stories = {
  Ordered: () => {
    const romanize = (num) => {
      const lookup = {m:1000,cm:900,d:500,cd:400,c:100,xc:90,l:50,xl:40,x:10,ix:9,v:5,iv:4,i:1};
      let roman = '';
      let tempNumber = num + 1 ;
      for ( let i in lookup ) {
        while ( tempNumber >= lookup[i] ) {
          roman += i;
          tempNumber -= lookup[i];
        }
      }
      return `${roman}. `;
    };
    const numberFormatter = (index: number) => `${index + 1}. `;
    const higherNumberFormatter = (index: number) => `${index + 91}. `;
    const numberHundredFormatter = (index: number) => `${index + 991}. `;
    const withZerosFormatter = (index: number) => `0${index + 1}. `;
    const withLettersFormatter = (index: number) => `${String.fromCharCode(index+97).toLowerCase()}. `;
    const romanFormatter =  romanize;
    const formatterType = {
      number: numberFormatter,
      numbers: higherNumberFormatter,
      hundred: numberHundredFormatter,
      zeros: withZerosFormatter,
      roman: romanFormatter,
      letters: withLettersFormatter,
    };
    const level = {
      first: 'first',
      second:'second',
      third:'third',
    };
    const setLevel = select('Set level', level,level.first);
    const formatter = select('Set formatter', formatterType, formatterType.number);
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
        subMenu: setLevel === level.second || setLevel === level.third
          ? [
            {
              label: ' Type something ',
            },
            {
              label: ' Type something ',
              subMenu: setLevel === level.third
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
    const level = {
      first: 'first',
      second:'second',
      third:'third',
    };
    const setLevel = select('Set level', level,level.first);
    const formatterUnordered = select('Set empty or dashed', formatterUnorderedType, formatterUnorderedType.empty);
    const preffix = {
      square:'square',
      disc:'disc',
      dashed:'dashed',
    };
    const formatter1 = select('Set formatter', preffix, preffix.square);
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
        subMenu: setLevel === level.second || setLevel === level.third
          ? [
            {
              label: 'Type something ',
            },
            {
              label: 'Type something ',
              subMenu: setLevel === level.third
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

    return <OrderedList listStyle={formatter1} data={data} indexFormatter={formatterUnordered} />;
  },
  ListWithIcons: () => {
    const level = {
      first: 'first',
      second:'second',
      third:'third',
    };
    const setLevel = select('Set level', level,level.first);
    const Icons = {
      CheckS: <Icon size={20} style={{marginBottom: '2px'}}  component={<CheckS />} />,
      Close3S: <Icon size={20} style={{marginBottom: '2px'}}  color={theme.palette['red-600']} component={<Close3S />} />,
      Check3S: <Icon size={20} style={{marginBottom: '2px'}}  color={theme.palette['green-600']} component={<Check3S />} />,
    };
    const textIcons = [
      'CheckS',
      'Close3S',
      'Check3S',
    ];
    const iconType = select('Set icon', textIcons,'CheckS');
    const data = [
      {
        label: 'Type something',
        prefixel: Icons[iconType],

      },
      {
        label: 'Type something',
        prefixel: Icons[iconType],
      },
      {
        label: 'Type something ',
        prefixel: Icons[iconType],
      },
      {
        label: 'Type something ',
        prefixel: Icons[iconType],
        subMenu: setLevel === level.second || setLevel === level.third
          ? [
            {
              label: 'Type something ',
              prefixel: Icons[iconType],
            },
            {
              label: 'Type something ',
              prefixel: Icons[iconType],
              subMenu: setLevel === level.third
                ? [
                  {
                    label: 'Type something ',
                    prefixel: Icons[iconType],
                  },
                  {
                    label: 'Type something ',
                    prefixel: Icons[iconType],
                  },
                ]
                : undefined,
            },
          ]
          : undefined,
      },
      {
        label: 'Type something ',
        prefixel: Icons[iconType],
      },
      {
        label: 'Type something',
        prefixel: Icons[iconType],
      },
      {
        label: 'Type something',
        prefixel: Icons[iconType],
      },
      {
        label: 'Type something ',
        prefixel: Icons[iconType],
      },
      {
        label: 'Type something ',
        prefixel: Icons[iconType],
      },
    ];

    return <OrderedList data={data} indexFormatter={emptyFormatter} />;
  },
};


export default {
  name: 'Components/OrderedList',
  config: {},
  stories,
};
