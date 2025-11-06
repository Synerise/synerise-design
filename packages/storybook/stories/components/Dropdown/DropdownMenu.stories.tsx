import React, { forwardRef, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button, { Creator } from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import Checkbox from '@synerise/ds-checkbox';
import {
  DropdownMenu,
  type DropdownMenuListItemProps,
  type DropdownMenuProps,
} from '@synerise/ds-dropdown';
import Icon, { AngleDownS, OptionHorizontalM } from '@synerise/ds-icon';
import { getPopupContainer } from '@synerise/ds-utils';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_NO_CONTROL,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  fixedWrapper800,
  overflowTestWrapper,
} from '../../utils';
import { PLACEMENTS } from './Dropdown.data';
import {
  BottomLeftWrapper,
  BottomRightWrapper,
  MENU_ITEMS,
  MENU_ITEMS_MULTI_SELECT,
  MENU_ITEMS_PLAIN,
  PageWrapper,
  TopLeftWrapper,
  TopRightWrapper,
} from './DropdownMenu.data';

type StoryType = DropdownMenuProps<DropdownMenuListItemProps>;

export default {
  title: 'Components/Dropdown/DropdownMenu',
  component: DropdownMenu,
  tags: [],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    open: BOOLEAN_CONTROL,
    asChild: {
      ...BOOLEAN_CONTROL,
      table: {
        type: {
          summary:
            'if `true` Dropdown will clone `children` and extend props with ref and event handlers. If false it will wrap with a <span> element that will handle events. \n Use popoverTriggerProps to apply any additional inline syle to the <span> element if needed',
        },
      },
    },
    withSearch: BOOLEAN_CONTROL,
    virtualised: BOOLEAN_CONTROL,
    maxVisibleItems: NUMBER_CONTROL,
    hideOnItemClick: BOOLEAN_CONTROL,
    // footer: REACT_NODE_NO_CONTROL,
    // children: REACT_NODE_NO_CONTROL,
    size: controlFromOptionsArray('radio', [
      'small',
      'medium',
      'large',
      'auto',
      'match-trigger',
    ]),
    placement: {
      ...controlFromOptionsArray('select', Object.keys(PLACEMENTS)),
    },
  },
  args: {
    asChild: true,
    children: (
      <Button type="primary" mode="label-icon">
        Open dropdown <Icon component={<AngleDownS />} />
      </Button>
    ),
  },
} as Meta<StoryType>;

export const Simple: StoryObj<StoryType> = {
  decorators: [centeredPaddedWrapper, overflowTestWrapper],
  args: {
    asChild: true,
    open: true,
    onSearchQueryChange: undefined,
    dataSource: MENU_ITEMS_PLAIN,
  },
};

export const SplitButton: StoryObj<StoryType> = {
  render: ({ children, ...args }) => {
    return (
      <div data-popup-container>
        <ButtonGroup splitMode>
          <Button type="primary">Save</Button>
          <DropdownMenu
            {...args}
            getPopupContainer={getPopupContainer}
            placement="bottomRight"
          >
            <Button mode="single-icon" type="primary">
              <Icon component={<AngleDownS />} />
            </Button>
          </DropdownMenu>
        </ButtonGroup>
      </div>
    );
  },
  decorators: [centeredPaddedWrapper, overflowTestWrapper],
  args: {
    asChild: true,
    open: true,
    size: 'small',
    onSearchQueryChange: undefined,
    dataSource: MENU_ITEMS_PLAIN,
  },
};

export const PlacementTest: StoryObj<StoryType> = {
  render: (args) => {
    return (
      <>
        <TopLeftWrapper>
          <DropdownMenu {...args} />
        </TopLeftWrapper>
        <TopRightWrapper>
          <DropdownMenu {...args} />
        </TopRightWrapper>
        <BottomLeftWrapper>
          <DropdownMenu {...args} />
        </BottomLeftWrapper>
        <BottomRightWrapper>
          <DropdownMenu {...args} />
        </BottomRightWrapper>
      </>
    );
  },
  args: {
    open: true,
    size: 'small',
    onSearchQueryChange: undefined,
    dataSource: MENU_ITEMS_PLAIN,
  },
};

export const ContextMenu: StoryObj<StoryType> = {
  decorators: [fixedWrapper800],
  render: (args) => {
    return (
      <PageWrapper>
        <TopRightWrapper>
          <DropdownMenu {...args} />
        </TopRightWrapper>
      </PageWrapper>
    );
  },
  args: {
    open: true,
    placement: 'bottomRight',
    onSearchQueryChange: undefined,
    dataSource: MENU_ITEMS,
    children: (
      <Button type="ghost" mode="single-icon">
        <Icon component={<OptionHorizontalM />} />
      </Button>
    ),
  },
};

export const WithSearch: StoryObj<StoryType> = {
  args: {
    withSearch: true,
    open: true,
    onSearchQueryChange: undefined,
    dataSource: MENU_ITEMS,
  },
};

export const MultipleSelect: StoryObj<StoryType> = {
  render: ({ dataSource, ...rest }) => {
    const [selected, setSelected] = useState<Array<string>>([]);

    const toggleItem = (itemId) => {
      if (selected.includes(itemId)) {
        const newItems = [...selected];
        newItems.splice(selected.indexOf(itemId), 1);
        setSelected(newItems);
      } else {
        setSelected([...selected, itemId]);
      }
    };
    const items = dataSource.map((item) => ({
      ...item,
      prefixel: (
        <Checkbox checked={item.id ? selected.includes(item.id) : false} />
      ),
      onClick: () => toggleItem(item.id),
    }));

    return <DropdownMenu dataSource={items} {...rest} />;
  },
  args: {
    withSearch: true,
    open: true,
    onSearchQueryChange: undefined,
    hideOnItemClick: false,
    dataSource: MENU_ITEMS_MULTI_SELECT,
  },
};

export const WithFooter: StoryObj<StoryType> = {
  args: {
    withSearch: true,
    open: true,
    size: 'medium',
    footer: (
      <>
        <Button type="ghost" mode="label">
          Footer button
        </Button>
        <Button type="ghost" mode="label">
          Footer button
        </Button>
      </>
    ),
    onSearchQueryChange: undefined,
    dataSource: MENU_ITEMS,
  },
};

export const WithFooterSplit: StoryObj<StoryType> = {
  args: {
    withSearch: true,
    open: true,
    size: 'medium',
    footer: {
      left: (
        <Button type="ghost" mode="label">
          Left button
        </Button>
      ),
      right: (
        <Button type="ghost" mode="label">
          Right button
        </Button>
      ),
    },
    onSearchQueryChange: undefined,
    dataSource: MENU_ITEMS,
  },
};

export const WithManyItems: StoryObj<StoryType> = {
  args: {
    withSearch: true,
    open: true,
    footer: {
      left: (
        <Button type="ghost" mode="label">
          Left button
        </Button>
      ),
      right: (
        <Button type="ghost" mode="label">
          Right button
        </Button>
      ),
    },
    onSearchQueryChange: undefined,
    dataSource: [...MENU_ITEMS, ...MENU_ITEMS, ...MENU_ITEMS, ...MENU_ITEMS],
  },
};

export const CreatorTrigger: StoryObj<StoryType> = {
  ...Simple,
  args: {
    ...Simple.args,
    children: <Creator label="Open dropdown" />,
  },
};
