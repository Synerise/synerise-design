import * as React from 'react';

import OrderedList from '@synerise/ds-ordered-list';
import { select, text } from '@storybook/addon-knobs';



const renderLabel = (text: string) => {
  return <div style={{  maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};

const romanize = num => {
  const lookup = {
    m: 1000,
    cm: 900,
    d: 500,
    cd: 400,
    c: 100,
    xc: 90,
    l: 50,
    xl: 40,
    x: 10,
    ix: 9,
    v: 5,
    iv: 4,
    i: 1,
  };
  let roman = '';
  let tempNumber = num + 1;
  for (let i in lookup) {
    while (tempNumber >= lookup[i]) {
      roman += i;
      tempNumber -= lookup[i];
    }
  }
  return `${roman}. `;
};
const numberFormatter = (index: number) => `${index + 1}. `;
const withZerosFormatter = (index: number) => `0${index + 1}. `;
const withLettersFormatter = (index: number) => `${String.fromCharCode(index + 97).toLowerCase()}. `;
const romanFormatter = romanize;
const formatterType = {
  Decimal: numberFormatter,
  'Decimal with leading zeros': withZerosFormatter,
  'Lowercase roman numerals': romanFormatter,
  'Lowercase ascii letters': withLettersFormatter,
};
const level = {
  first: 'first',
  second: 'second',
  third: 'third',
};


const stories = {
  default: () => {

    const setLevel = select('Set list level', level, level.first);
    const formatter = select('Set order type', formatterType, formatterType.Decimal);
    const data = [
      {
        label: ' Ordered List level 1',
      },
      {
        label: ' Ordered List level 1',
      },
      {
        label: ' Ordered List level 1',
      },
      {
        label: ' Ordered List level 1 ',
        subMenu:
          setLevel === level.second || setLevel === level.third
            ? [
                {
                  label: ' Ordered List level 2 ',
                },
                {
                  label: ' Ordered List level 2 ',
                  subMenu:
                    setLevel === level.third
                      ? [
                          {
                            label: ' Ordered List level 3',
                          },
                          {
                            label: ' Ordered List level 3 ',
                          },
                        ]
                      : undefined,
                },
              ]
            : undefined,
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
    ];

    return <OrderedList text={renderLabel(text('Label', 'Header label'))} data={data} indexFormatter={formatter} />;
  },
  NestList: () => {
    const level = {
      first: 'first',
      second: 'second',
    };
    const setLevel = select('Set list level', level, level.second);
    const formatter = select('Set order type', formatterType, formatterType.Decimal);
    const data = [
      {
        label: ' Ordered List level 1',
      },
      {
        label: ' Ordered List level 1',
      },
      {
        label: ' Ordered List level 1',
      },
      {
        label: ' Ordered List level 1 ',
        subMenuProps: {
          indexFormatter: withLettersFormatter,
        },
        subMenu:
          setLevel === level.second
            ? [
                {
                  label: ' Ordered List level 2 ',
                },
                {
                  label: ' Ordered List level 2 ',
                },

                {
                  label: ' Ordered List level 2',
                },
                {
                  label: ' Ordered List level 2 ',
                },
              ]
            : undefined,
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
    ];

    return <OrderedList text={renderLabel(text('Label', 'Header label'))} data={data} indexFormatter={formatter} />;
  },
  NestedList: () => {
    const level = {
      first: 'first',
      second: 'second',
      third: 'third',
    };
    const setLevel = select('Set list level', level, level.third);
    const formatter = select('Set order type', formatterType, formatterType.Decimal);
    const data = [
      {
        label: ' Ordered List level 1',
      },
      {
        label: ' Ordered List level 1',
      },
      {
        label: ' Ordered List level 1',
      },
      {
        label: ' Ordered List level 1 ',
        subMenuProps: {
          indexFormatter: withZerosFormatter,
        },
        subMenu:
          setLevel === level.second || setLevel === level.third
            ? [
                {
                  label: ' Ordered List level 2 ',
                },
                {
                  label: ' Ordered List level 2 ',
                  subMenuProps: {
                    indexFormatter: withLettersFormatter,
                  },
                  subMenu:
                    setLevel === level.third
                      ? [
                          {
                            label: ' Ordered List level 3',
                          },
                          {
                            label: ' Ordered List level 3 ',
                          },
                        ]
                      : undefined,
                },
              ]
            : undefined,
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
      {
        label: ' Ordered List level 1 ',
      },
    ];

    return <OrderedList text={renderLabel(text('Label', 'Header label'))} data={data} indexFormatter={formatter} />;
  },
};

export default {
  name: 'Components/Ordered&UnorderedList/Ordered-list',
  config: {},
  stories,
};
