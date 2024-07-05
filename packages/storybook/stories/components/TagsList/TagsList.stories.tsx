import React, { ReactNode, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Layout from '@synerise/ds-layout';
import TagsList, { DEFAULT_STEP, DEFAULT_ITEMS_VISIBLE } from '@synerise/ds-tagslist';
import type { TagsListProps, TagsListActions, TagsListItem } from '@synerise/ds-tagslist';

import {
  fixedWrapper300,
} from '../../utils';
import Menu from '@synerise/ds-menu';
import { NOOP } from '@synerise/ds-utils';
import Scrollbar from '@synerise/ds-scrollbar';
import { ADD_ITEMS_LOADING_TIMEOUT, ADD_TAGS, FOLDERS, TEXTS, TOP_MENU_ITEMS } from './TagsList.constants';
import { theme } from '@synerise/ds-core';
import Icon, { StarFillM, StarM } from '@synerise/ds-icon';
import { fn } from '@storybook/test';

type Story = StoryObj<TagsListProps>;

const TagsListMeta: Meta<TagsListProps> = {
  title: 'Components/TagsList',
  tags: ['autodocs'],
  component: TagsList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {},
};
export default TagsListMeta;

export const Default: Story = {
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper300],
};
export const ControlledInSidebar: Story = {
  args: {
    maxItemsVisible: DEFAULT_ITEMS_VISIBLE,
    showMoreStep: DEFAULT_STEP,
    withCheckbox: true,
    texts: TEXTS,
    addButtonDisabled: false,
    onManageTags: fn(),
    onAddDropdown: fn(),
    onItemsAdd: fn(),
  },
  render: args => {
    const [starred, setStarred] = useState(false);
    const [dataSource, setDataSource] = useState(FOLDERS);
    const [addItems, setAddItems] = useState<typeof ADD_TAGS>([]);
    const [addItemsLoading, setAddItemsLoading] = useState(true);

    const handleOnChange = (action: TagsListActions, newItems: TagsListItem[], newItem: TagsListItem, originItem: TagsListItem[], originTargetItem: TagsListItem) => {
      setDataSource(newItems);
      args.onChange?.(action, newItems, newItem, originItem, originTargetItem);
    };
    const renderMenuItem = (item: { icon: ReactNode; text: string }, onClick: () => void) => (
      <Menu.Item prefixel={<Icon component={item.icon} />} text={item.text} onClick={onClick} />
    );
    const handleOnAddDropdown = (visible: boolean) => {
      if (visible)
        setTimeout(() => {
          setAddItemsLoading(false);
          setAddItems(ADD_TAGS);
        }, ADD_ITEMS_LOADING_TIMEOUT);

      if (!visible)
        setTimeout(() => {
          setAddItemsLoading(true);
          setAddItems([]);
        }, ADD_ITEMS_LOADING_TIMEOUT);
      args.onAddDropdown?.(visible);
    };

    const handleOnItemsAdd = (items: TagsListItem[]) => {
      const newItems = items.map(item => ({ ...item, checked: false }));
      const newDs = [...dataSource];
      newItems.forEach((item: TagsListItem) => {
        if (newDs.findIndex((row: TagsListItem) => row.id === item.id) === -1) newDs.push(item);
      });
      setDataSource(newDs);
      args.onItemsAdd?.(items);
    };

    const onItemClick = () => setStarred(!starred);
    return (
      <Layout
        left={{
          opened: true,
          onChange: NOOP,
          content: (
            <Scrollbar absolute>
              <Menu asDropdownMenu style={{ width: 'auto', padding: '24px' }} data-popup-container>
                {TOP_MENU_ITEMS.map(item =>
                  renderMenuItem(item, (): void => {
                    setStarred(false);
                  })
                )}
                <Menu.Item
                  onClick={onItemClick}
                  prefixel={
                    <div>
                      <Icon
                        component={starred ? <StarFillM /> : <StarM />}
                        color={starred ? theme.palette['yellow-600'] : theme.palette['grey-600']}
                      />
                    </div>
                  }
                >
                  Starred
                </Menu.Item>
                <Menu.Divider higher />
                <TagsList
                  {...args}
                  items={dataSource}
                  onChange={handleOnChange}
                  onAddDropdown={handleOnAddDropdown}
                  onItemsAdd={handleOnItemsAdd}
                  addItemsLoading={addItemsLoading}
                  addItemsList={addItems}
                />
              </Menu>
            </Scrollbar>
          ),
        }}
      >
        {' '}
        main content
      </Layout>
    );
  },
};
