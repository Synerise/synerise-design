import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { OrderedListSkeleton } from '@synerise/ds-skeleton';
import UnorderedList, { UnorderedListProps } from '@synerise/ds-unordered-list';

import { controlFromOptionsArray, fixedWrapper300 } from '../../utils';
import { FORMATTERS, LIST_DATA } from './UnorderedList.data';

export default {
  component: UnorderedList,
  title: 'Components/OrderedAndUnorderedList/UnorderedList',
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
} as Meta<UnorderedListProps>;

export const Default: StoryObj<UnorderedListProps> = {
  args: {
    text: 'List Header',
    indexFormatter: FORMATTERS.dashed,
  },
};

export const Skeleton: StoryObj<UnorderedListProps> = {
  args: {
    data: [
      {
        id: '0',
        index: 0,
        label: <OrderedListSkeleton size="M" />,
      },
    ],
    text: 'List Header',
    indexFormatter: FORMATTERS.empty,
  },
};
