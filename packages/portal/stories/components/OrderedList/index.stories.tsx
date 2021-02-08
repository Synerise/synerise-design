import * as React from 'react';

import OrderedList from '@synerise/ds-ordered-list';
import { boolean, select } from '@storybook/addon-knobs';

const preffixType = {
  numbers: 'numbers',
  withZeros: 'withZeros',
  withLetters: 'WithLetters',
  withRomanian: 'withRomanian',
};
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
