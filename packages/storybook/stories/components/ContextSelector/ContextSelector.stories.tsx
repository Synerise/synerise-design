import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ContextSelector from '@synerise/ds-context-selector';
import type { ContextProps, ContextItem } from '@synerise/ds-context-selector';

import { CONTEXT_GROUPS, CONTEXT_ITEMS, CONTEXT_TEXTS } from './data/context.data';
import { CONTEXT_CLIENT_GROUPS, CONTEXT_CLIENT_ITEMS, FLAT_LIST_ITEMS } from './data/client.data';
import { ItemSize } from '@synerise/ds-menu';

export default {
  title: 'Components/Filter/ContextSelector',
  component: ContextSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: args => {
    const [value, setValue] = useState<ContextItem | undefined>(args.selectedItem);
    return (
      <ContextSelector
        {...args}
        selectedItem={value}
        onSelectItem={value => {
          args.onSelectItem && args.onSelectItem(value);
          setValue(value as ContextItem);
        }}
      />
    );
  },
  argTypes: {
    setDropdownVisible: {
      action: 'setDropdownVisible',
    },
    setSelected: {
      action: 'setSelected',
    },
    onSelectItem: {
      action: 'onSelectItem',
    },
  },
  args: {
    texts: CONTEXT_TEXTS,
    items: CONTEXT_ITEMS,
    groups: CONTEXT_GROUPS,
    onClickOutsideEvents: undefined,
  },
} as Meta<ContextProps>;

type Story = StoryObj<ContextProps>;

export const BusinessContext: Story = {};

export const LargeItems: Story = {
  args: {
    menuItemHeight: 'large' as ItemSize,
  },
};

export const ClientContext: Story = {
  args: {
    items: CONTEXT_CLIENT_ITEMS,
    groups: CONTEXT_CLIENT_GROUPS,
  },
};

export const FlatListDataStructure: Story = {
  args: {
    items: FLAT_LIST_ITEMS,
    groups: [],
  },
};
