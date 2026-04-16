import React, { useState } from 'react';
import { action } from 'storybook/actions';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { SaveM } from '@synerise/ds-icon';
import ItemsRoll, { ItemsRollProps } from '@synerise/ds-items-roll';
import Menu from '@synerise/ds-menu';
import { focusWithArrowKeys } from '@synerise/ds-utils';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  STRING_CONTROL,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  fixedWrapper800,
} from '../../utils';
import {
  ACTIONS,
  GROUPED_ITEMS,
  ICONS,
  ITEMS_100,
  ITEMS_LARGE,
  SEARCH_PLACEHOLDER,
} from './ItemsRoll.data';

type StoryType = ItemsRollProps & {
  withChangeSelectionDropdown: boolean;
};
type Story = StoryObj<StoryType>;

export default {
  component: ItemsRoll,
  title: 'Components/ItemsRoll',
  tags: [],
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
      setItems(items.filter((item) => item.id !== itemId));
      args.onItemRemove?.(itemId, grouId);
    };

    const onSearch = (value: string) => {
      const lookupItems = args.items;

      if (searchValue !== value) {
        const filteredItems = lookupItems.filter((item) =>
          `${item.text}`.toLowerCase().includes(value.toLowerCase()),
        );
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
          size: 160,
          overlay: (
            <Dropdown.Wrapper
              onKeyDown={(event) =>
                focusWithArrowKeys(event, 'ds-menu-item', () => {})
              }
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
    hideSearch: BOOLEAN_CONTROL,
    isDisabled: BOOLEAN_CONTROL,
    searchPlaceholder: STRING_CONTROL,
    onChangeSelection: BOOLEAN_CONTROL,
    texts: {
      noResultsLabel: STRING_CONTROL,
    },
    items: {
      control: false,
    },
    useVirtualizedList: { table: { disable: true } },
    virtualizedRowHeight: { table: { disable: true } },
    virtualizedRowWidth: { table: { disable: true } },
    intl: { table: { disable: true } },
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
    hideSearch: false,
    withChangeSelectionDropdown: false,
    onChangeSelection: fn(),
    renderCount: (count: number) => <>Items: {count} / 500</>,
  },
} as Meta<StoryType>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ItemsRoll
  items={items}
  actions={actions}
  maxToShowItems={10}
  showMoreStep={10}
  useFooter
  searchPlaceholder="Search..."
  onSearch={handleSearch}
  onSearchClear={handleSearchClear}
  onChangeSelection={handleChangeSelection}
  onClearAll={handleClearAll}
  onItemRemove={handleItemRemove}
  renderCount={(count) => <>Items: {count} / 500</>}
/>`,
      },
    },
  },
};

export const Simple: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ItemsRoll
  items={items}
  hideSearch
/>`,
      },
    },
  },
  args: {
    renderCount: () => <></>,
    onChangeSelection: undefined,
    actions: undefined,
    hideSearch: true,
    useFooter: false,
  },
};

export const LargeItems: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ItemsRoll
  items={largeItems}
  hideSearch
/>`,
      },
    },
  },
  args: {
    items: ITEMS_LARGE,
    onChangeSelection: undefined,
    renderCount: () => <></>,
    actions: undefined,
    hideSearch: true,
    useFooter: false,
  },
};

export const Empty: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ItemsRoll
  items={[]}
  texts={{ noResultsLabel: 'No items added' }}
/>`,
      },
    },
  },
  args: {
    items: [],
    onChangeSelection: undefined,
    texts: {
      noResultsLabel: 'No items added',
    },
  },
};

export const Grouped: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ItemsRoll
  items={groupedItems}
  groups={['Parameter', 'Aggregate', 'Expression']}
  useFooter
  maxToShowItems={10}
  showMoreStep={10}
  onSearch={handleSearch}
  onSearchClear={handleSearchClear}
  onChangeSelection={handleChangeSelection}
  onClearAll={handleClearAll}
  onItemRemove={handleItemRemove}
/>`,
      },
    },
  },
  args: {
    items: GROUPED_ITEMS.items,
    groups: GROUPED_ITEMS.groups,
  },
};

export const ChangeSelectionDropdown: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ItemsRoll
  items={items}
  useFooter
  onChangeSelection={handleChangeSelection}
  changeSelectionDropdownProps={{
    overlay: <DropdownMenu />,
    trigger: ['click'],
    visible,
    onVisibleChange: setVisible,
  }}
/>`,
      },
    },
  },
  args: {
    withChangeSelectionDropdown: true,
  },
};

export const CustomSidebarActions: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ItemsRoll
  items={items}
  useFooter
  customSidebarActions={
    <Button mode="icon-label" type="ghost" icon={<Icon component={<SaveM />} />}>
      Save list
    </Button>
  }
/>`,
      },
    },
  },
  args: {
    customSidebarActions: (
      <div style={{ display: 'flex', marginRight: '8px' }}>
        <Button
          mode="icon-label"
          type="ghost"
          icon={
            <Icon component={<SaveM />} color={theme.palette['grey-600']} />
          }
          onClick={action('Click custom action')}
        >
          Save list
        </Button>
      </div>
    ),
  },
};
