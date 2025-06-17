import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { OrderedListSkeleton } from '@synerise/ds-skeleton';
import OrderedList, { OrderedListProps } from '@synerise/ds-ordered-list';

import { emptyFormatter, FORMATTERS, LIST_DATA } from './IconsList.data';
import { controlFromOptionsArray, fixedWrapper300 } from '../../utils';

export default {
  component: OrderedList,
  title: 'Components/OrderedAndUnorderedList/IconsList',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  argTypes: {
    data: {
      control: false,
    },
    indexFormatter: {
      ...controlFromOptionsArray('inline-radio', Object.keys(FORMATTERS)),
      mapping: FORMATTERS,
    },
  },
  args: {
    data: LIST_DATA,
  },
} as Meta<OrderedListProps>;

type Story = StoryObj<OrderedListProps>;

export const Default: Story = {
  args: {
    text: 'List Header',
    indexFormatter: 'CheckS',
  },
};

export const Skeleton: Story = {
  args: {
    data: [
      {
        id: '0',
        index: 0,
        label: <OrderedListSkeleton size="M" />,
      },
    ],
    text: 'List Header',
    indexFormatter: emptyFormatter.empty,
  },
};