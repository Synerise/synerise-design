import React from 'react';

import type { StoryObj, Meta } from '@storybook/react-webpack5';

import Pagination from '@synerise/ds-pagination';

import {
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
} from '../../utils';


export default {
  title: "Components/Pagination",
  tags: ['autodocs'],
  component: Pagination,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    defaultCurrent: NUMBER_CONTROL,
    total: NUMBER_CONTROL,
  },
} as Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    default: 1,
    total: 5000,
  },
};