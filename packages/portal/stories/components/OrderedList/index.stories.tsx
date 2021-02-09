import * as React from 'react';

import OrderedList from '@synerise/ds-ordered-list';
import { boolean, select } from '@storybook/addon-knobs';

const preffixType = {
  numbers: 'numbers',
  withZeros: 'withZeros',
  withLetters: 'WithLetters',
  withRomanian: 'withRomanian',
};
const data = [
  {
    title: "1. Type something",
    slug: "1. Type something",
  },
  {
    title: "2. Type something",
    slug: "2. Type something",
  },
  {
    title: "3. Type something",
    slug: "3. Type something",
  },
  {
    title: "4. Type something",
    slug:  "4. Type something",
    subMenu: [
      {
        title: "01. Type something",
        slug: "01. Type something",
      },
      {
        title: "02. Type something",
        slug: "02. Type something",
        subMenu: [
          {
            title: "a. Type something",
            slug: "a. Type something",
          },
          {
            title: "b. Type something",
            slug: "b. Type something",
          }
        ]
      },
    ]
  },
  {
    title: "5. Type something",
    slug: "5. Type something",
  },
  {
    title: "6. Type something",
    slug: "6. Type something",
  },
  {
    title: "7. Type something",
    slug: "7. Type something",
  },
  {
    title: "8. Type something",
    slug: "8. Type something",
  },
  {
    title: "9. Type something",
    slug: "9. Type something",
  },
];
const number = [{ label: '1. ' }, { label: '2. ' }, { label: '3. ' }, { label: '4. ' }];
const withZeros = [{ label: '01. ' }, { label: '02. ' }, { label: '03. ' }, { label: '04. ' }];
const withLetters = [{ label: 'a. ' }, { label: 'b. ' }, { label: 'c. ' }, { label: 'd. ' }];
const withRomanian = [{ label: 'I. ' }, { label: 'II. ' }, { label: 'III. ' }, { label: 'IV. ' }];
const stories = {
  Ordered: () => {
    const showInfo = boolean('Set Level 2', true);
    const showOptions = boolean('Set Level 3', true);
    const selectPreffixType = select('Set Preffix', preffixType, preffixType.numbers);
    return <OrderedList list={showInfo} options={showOptions}></OrderedList>;
  },
  Unordered: () => {
    const showInfo = boolean('Set Level 2', true);
    const showOptions = boolean('Set Level 3', true);
    return <OrderedList list={showInfo} options={showOptions}></OrderedList>;
  },
  IconList: () => {
    const showInfo = boolean('Set Level 2', true);
    const showOptions = boolean('Set Level 3', true);
    return <OrderedList list={showInfo} options={showOptions}></OrderedList>;
  },
};

export default {
  name: 'Components/OrderedList',
  config: {},
  stories,
};
