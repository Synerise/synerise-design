import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import OrderedList, { OrderedListProps } from '@synerise/ds-ordered-list';
import { OrderedListSkeleton } from '@synerise/ds-skeleton';

import { controlFromOptionsArray, fixedWrapper300 } from '../../utils';
import { FORMATTERS, LIST_DATA, emptyFormatter } from './IconsList.data';

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
