import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import Icon, { DragHandleM } from '@synerise/ds-icon';
import Sortable, { SortableProps } from '@synerise/ds-sortable';

import { fixedWrapper200 } from '../../utils';
import { SortableItem, SortableItemWithHandle } from './SortableItem';

export default {
  component: Sortable,
  title: 'Components/Sortable',
  tags: ['autodocs'],
  decorators: [fixedWrapper200],
  parameters: {
    //   controls: {
    //     exclude: ['animation', 'internalProps', 'choiceTransitionName', 'direction', 'filterOption', 'inputValue']
    //   }
  },
  // render: ,
  argTypes: {},
  args: {
    onOrderChange: fn(),
    items: [
      {
        text: 'one',
        id: '1',
      },
      {
        text: 'two',
        id: '2',
      },
      {
        text: 'three',
        id: '3',
      },
      {
        text: 'four',
        id: '4',
      },
      {
        text: 'five',
        id: '5',
      },
      {
        text: 'six',
        id: '6',
      },
    ],
    ItemComponent: SortableItem,
  },
} as Meta<SortableProps>;

type Story = StoryObj<SortableProps>;

export const ListItems: Story = {
  args: {
    ItemComponent: SortableItem,
  },
};

export const ListItemWithHandle: Story = {
  args: {
    ItemComponent: SortableItemWithHandle,
  },
};
