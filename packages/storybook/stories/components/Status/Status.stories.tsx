import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Status from '@synerise/ds-status';
import { customColors } from '@synerise/ds-tokens/names';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  centeredPaddedWrapper,
  controlFromOptionsArray,
} from '../../utils';

const COLOR_OPTIONS = {
  blue: customColors.blue['600'],
  grey: customColors.grey['600'],
  red: customColors.red['600'],
  green: customColors.green['600'],
  yellow: customColors.yellow['600'],
  pink: customColors.pink['600'],
  mars: customColors.mars['600'],
  orange: customColors.orange['600'],
  fern: customColors.fern['600'],
  cyan: customColors.cyan['600'],
  purple: customColors.purple['600'],
  violet: customColors.violet['600'],
};

export default {
  title: 'Components/Status',
  tags: ['autodocs'],
  component: Status,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    label: REACT_NODE_AS_STRING,
    type: {
      ...controlFromOptionsArray('select', [
        'default',
        'primary',
        'success',
        'warning',
        'danger',
        'info',
        'disabled',
        'custom',
      ]),
    },
    color: {
      ...controlFromOptionsArray('select', Object.keys(COLOR_OPTIONS)),
      mapping: COLOR_OPTIONS,
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
