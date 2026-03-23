import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Loader from '@synerise/ds-loader';

import {
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  centeredPaddedWrapper,
  controlFromOptionsArray,
} from '../../utils';
import { COLOR_OPTIONS, fontSizes, formatter, iconSizes } from './Loader.data';

export default {
  title: 'Components/Loader',
  tags: ['autodocs'],
  component: Loader,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    label: REACT_NODE_AS_STRING,
    text: REACT_NODE_AS_STRING,
    size: {
      ...controlFromOptionsArray('select', Object.keys(iconSizes)),
      mapping: iconSizes,
    },
    fontSize: {
      ...controlFromOptionsArray('select', Object.keys(fontSizes)),
      mapping: fontSizes,
    },
    labelPosition: {
      ...controlFromOptionsArray('select', ['right', 'bottom']),
    },
    color: COLOR_OPTIONS,
    percentFormatter: {
      control: false,
    },
  },
} as Meta<typeof Loader>;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    label: 'Loading...',
    size: 'L',
    fontSize: 'small',
    labelPosition: 'right',
    color: 'grey',
  },
};

export const LoaderWithPercentFormatter: Story = {
  ...Default,
  args: {
    ...Default.args,
    percentFormatter: formatter,
  },
};

export const LoaderWithHeaderAndDescription: Story = {
  args: {
    text: 'You will be redirected to Synerise',
    label: 'Please wait a second to proceed.',
    size: 'L',
    fontSize: 'small',
    labelPosition: 'bottom',
    color: 'grey',
  },
};
