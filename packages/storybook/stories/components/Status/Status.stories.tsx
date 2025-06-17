import React from 'react';

import type { StoryObj, Meta } from '@storybook/react-webpack5';

import Status from '@synerise/ds-status';

import {
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray, BOOLEAN_CONTROL,
} from '../../utils';
import { theme }from '@synerise/ds-core';

const COLOR_OPTIONS = {
  blue: theme.palette['blue-600'],
  grey: theme.palette['grey-600'],
  red: theme.palette['red-600'],
  green: theme.palette['green-600'],
  yellow: theme.palette['yellow-600'],
  pink: theme.palette['pink-600'],
  mars: theme.palette['mars-600'],
  orange: theme.palette['orange-600'],
  fern: theme.palette['fern-600'],
  cyan: theme.palette['cyan-600'],
  purple: theme.palette['purple-600'],
  violet: theme.palette['violet-600'],
};


export default {
  title: "Components/Status",
  tags: ['autodocs'],
  component: Status,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    label: REACT_NODE_AS_STRING,
    type: {...controlFromOptionsArray('select', ['default', 'primary', 'success', 'warning', 'danger', 'info', 'disabled', 'custom'])},
    color: {
      ...controlFromOptionsArray('select', Object.keys(COLOR_OPTIONS)),
      mapping: COLOR_OPTIONS
    },
    dashed: BOOLEAN_CONTROL,
  },
} as Meta<typeof Status>;

type Story = StoryObj<typeof Status>;

export const Default: Story = {
  args: {
    label: 'Status',
    type: 'primary',
    dashed: false,
  },
};


