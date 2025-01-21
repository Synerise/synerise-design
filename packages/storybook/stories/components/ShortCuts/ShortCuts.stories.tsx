import React from 'react';

import type { StoryObj, Meta } from '@storybook/react';

import ShortCuts from '@synerise/ds-short-cuts';
import { ArrowUpM } from '@synerise/ds-icon';

import {
  centeredPaddedWrapper,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray,
  BOOLEAN_CONTROL,
} from '../../utils';

const COLOR_OPTIONS = {
  Dark: 'dark',
  Light: 'light',
};


export default {
  title: "Components/ShortCuts",
  tags: ['autodocs'],
  component: ShortCuts,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    size: {...controlFromOptionsArray('select', ['L', 'S'])},
    icon: REACT_NODE_AS_STRING,
    color: {
      ...controlFromOptionsArray('select', Object.keys(COLOR_OPTIONS)),
      mapping: COLOR_OPTIONS
    },
    children: REACT_NODE_AS_STRING,
    autoWidth: BOOLEAN_CONTROL,
  },
} as Meta<typeof ShortCuts>;

type Story = StoryObj<typeof ShortCuts>;

export const Default: Story = {
  args: {
    size: 'L',
    color: 'dark',
    children: 'S',
    autoWidth: false,
  },
};

export const ShortCutWithIcon: Story = {
  ...Default,
  args: {
    ...Default.args,
    icon: <ArrowUpM/>,
  },
};