import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Skeleton from '@synerise/ds-skeleton';

import {
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  controlFromOptionsArray,
  fixedWrapper200,
} from '../../utils';

export default {
  title: 'Components/Skeleton',
  tags: ['autodocs'],
  component: Skeleton,
  decorators: [fixedWrapper200],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    size: { ...controlFromOptionsArray('select', ['S', 'M', 'L']) },
    width: { ...controlFromOptionsArray('select', ['M', 'L']) },
    height: NUMBER_CONTROL,
    numberOfSkeletons: NUMBER_CONTROL,
  },
} as Meta<typeof Skeleton>;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    size: 'S',
    width: 'M',
    height: 24,
    numberOfSkeletons: 2,
  },
};
