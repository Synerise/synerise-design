import React, { useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import ContextSelector, {
  ContextItem,
  ContextProps,
} from '@synerise/ds-context-selector';

import {
  CONTEXT_CLIENT_GROUPS,
  CONTEXT_CLIENT_ITEMS,
  CONTEXT_DEFAULT_GROUPS,
  CONTEXT_DEFAULT_ITEMS,
  FLAT_LIST_ITEMS,
} from './data/client.data';
import {
  CONTEXT_GROUPS,
  CONTEXT_ITEMS,
  CONTEXT_TEXTS,
} from './data/context.data';

export default {
  title: 'Components/Filter/ContextSelector',
  component: ContextSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [value, setValue] = useState<ContextItem | undefined>(
      args.selectedItem,
    );
    return (
      <ContextSelector
        {...args}
        selectedItem={value}
        onSelectItem={(value) => {
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
    items: {
      control: false,
    },
    groups: {
      control: false,
    },
  },
  args: {
    onActivate: fn(),
    onClickOutside: fn(),
    onDeactivate: fn(),
    onFetchData: fn(),
    onOpen: fn(),
    onSearch: fn(),
    onSelectItem: fn(),
    onSetGroup: fn(),
    texts: CONTEXT_TEXTS,
    onClickOutsideEvents: undefined,
  },
} as Meta<ContextProps>;

type Story = StoryObj<ContextProps>;

export const BusinessContext: Story = {
  args: {
    items: CONTEXT_ITEMS,
    groups: CONTEXT_GROUPS,
  },
};

export const LargeItems: Story = {
  args: {
    ...BusinessContext.args,
    menuItemHeight: 'large',
  },
};

export const ClientContext: Story = {
  args: {
    items: CONTEXT_CLIENT_ITEMS,
    groups: CONTEXT_CLIENT_GROUPS,
  },
};

export const StandardSearch: Story = {
  args: {
    items: CONTEXT_CLIENT_ITEMS,
    groups: CONTEXT_CLIENT_GROUPS,
    onSearch: undefined,
  },
};

export const DefaultContext: Story = {
  args: {
    items: CONTEXT_DEFAULT_ITEMS,
    groups: CONTEXT_DEFAULT_GROUPS,
    onSearch: undefined,
  },
};

export const FlatListDataStructure: Story = {
  args: {
    items: FLAT_LIST_ITEMS,
    groups: [],
  },
};

const suggestionsTopSection = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 8 }}>
    <span style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}>
      Suggested
    </span>
    <div style={{ display: 'flex', gap: 8 }}>
      <button type="button" aria-label="Suggested: Revenue">
        Revenue
      </button>
      <button type="button" aria-label="Suggested: Last purchase">
        Last purchase
      </button>
    </div>
  </div>
);

export const TopSection: Story = {
  args: {
    items: CONTEXT_ITEMS,
    groups: CONTEXT_GROUPS.map((group, index) =>
      index === 0 ? { ...group, topSection: suggestionsTopSection } : group,
    ),
  },
};
