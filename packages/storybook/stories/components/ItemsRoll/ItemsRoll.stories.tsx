import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ItemsRoll, { ItemsRollProps } from '@synerise/ds-items-roll';
import Dropdown from '@synerise/ds-dropdown';
import { focusWithArrowKeys } from '@synerise/ds-utils';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import Icon, { SaveM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';

import { ACTIONS, GROUPED_ITEMS, ICONS, ITEMS_100, ITEMS_1000, SEARCH_PLACEHOLDER } from './ItemsRoll.data';
import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  fixedWrapper800,
  NUMBER_CONTROL,
  STRING_CONTROL,
} from '../../utils';

type StoryType = ItemsRollProps & {
  withChangeSelectionDropdown: boolean;
};
type Story = StoryObj<StoryType>;

export default {
  component: ItemsRoll,
  title: 'Components/ItemsRoll',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [fixedWrapper800, centeredPaddedWrapper],
  render: ({ withChangeSelectionDropdown, ...args }) => {
    const [items, setItems] = useState(args.items);
    const [searchValue, setSearchValue] = useState('');

    const onClearAll = () => {
      setSearchValue('');
      setItems([]);
      args.onClearAll?.();
    };

    const onSearchClear = () => {
      setSearchValue('');
      setItems(args.items);
      args.onSearchClear?.();
    };

    const onItemRemove = (itemId: string, grouId?: string) => {
      setItems(items.filter(item => item.id !== itemId));
      args.onItemRemove?.(itemId, grouId);
    };

    const onSearch = (value: string) => {
      const lookupItems = args.items;

      if (searchValue !== value) {
        const filteredItems = lookupItems.filter(item => `${item.text}`.toLowerCase().includes(value.toLowerCase()));
        setSearchValue(value);
        setItems(filteredItems);
      }
      if (value === '') {
        setItems(lookupItems);
      }
      args.onSearch?.(value);
    };

    const [visible, setVisible] = useState(false);
    const changeSelectionDropdownProps = withChangeSelectionDropdown
      ? {
          overlay: (
            <Dropdown.Wrapper
              style={{ width: '157px' }}
              onKeyDown={event => focusWithArrowKeys(event, 'ds-menu-item', () => {})}
            >
              <Menu
                dataSource={[{ text: 'Option 1' }, { text: 'Option 2' }]}
                asDropdownMenu={true}
                style={{ width: '100%' }}
              />
            </Dropdown.Wrapper>
          ),
          trigger: ['click' as const],
          visible,
          onVisibleChange: () => setVisible(!visible),
        }
      : undefined;

    return (
      <ItemsRoll
        {...args}
        onItemRemove={onItemRemove}
        onSearch={onSearch}
        onSearchClear={onSearchClear}
        items={items}
        onClearAll={onClearAll}
        searchValue={searchValue}
        changeSelectionDropdownProps={changeSelectionDropdownProps}
      />
    );
  },
  argTypes: {
    maxToShowItems: NUMBER_CONTROL,
    showMoreStep: NUMBER_CONTROL,
    useFooter: BOOLEAN_CONTROL,
    useVirtualizedList: BOOLEAN_CONTROL,
    hideSearch: BOOLEAN_CONTROL,
    isDisabled: BOOLEAN_CONTROL,
    searchPlaceholder: STRING_CONTROL,
    items: {
      control: false,
    },
    changeSelectionIcon: {
      ...controlFromOptionsArray('select', Object.keys(ICONS)),
      mapping: ICONS,
    },
  },
  args: {
    actions: ACTIONS,
    items: ITEMS_100,
    searchPlaceholder: SEARCH_PLACEHOLDER,
    maxToShowItems: 10,
    showMoreStep: 10,
    useFooter: true,
    useVirtualizedList: false,
    hideSearch: false,
    withChangeSelectionDropdown: false,
    renderCount: (count: number) => <>Items: {count} / 500</>,
  },
} as Meta<StoryType>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const VirtualisedList: Story = {
  args: {
    useVirtualizedList: true,
    renderCount: undefined,
    virtualizedRowHeight: 32,
    items: ITEMS_1000,
  },
};

export const Grouped: Story = {
  args: {
    items: GROUPED_ITEMS.items,
    groups: GROUPED_ITEMS.groups,
  },
};

export const ChangeSelectionDropdown: Story = {
  args: {
    withChangeSelectionDropdown: true,
  },
};

export const CustomSidebarActions: Story = {
  args: {
    customSidebarActions: (
      <div style={{ display: 'flex', marginRight: '8px' }}>
        <Button
          mode="icon-label"
          type="ghost"
          icon={<Icon component={<SaveM />} color={theme.palette['grey-600']} />}
          onClick={action('Click custom action')}
        >
          Save list
        </Button>
      </div>
    ),
  },
};
