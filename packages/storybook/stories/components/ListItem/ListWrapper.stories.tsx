import React, { type UIEvent, useRef } from 'react';
import { ListChildComponentProps, VariableSizeList } from 'react-window';
import { fn } from 'storybook/test';
import styled from 'styled-components';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import ListItem, {
  ListItemProps,
  ListWrapper,
  ListWrapperProps,
} from '@synerise/ds-list-item';
import Scrollbar from '@synerise/ds-scrollbar';

// use `?raw` to import as string

import { CLASSNAME_ARG_CONTROL, fixedWrapper300 } from '../../utils';
import info from './ListWrapper.info.md?raw';
import { LIST_ITEMS } from './listItem.data';

type Story = StoryObj<ListWrapperProps>;

export default {
  component: ListWrapper,
  title: 'Components/ListItem/ListWrapper',
  parameters: {
    docs: {
      description: {
        component: info,
      },
    },
  },
  tags: ['autodocs'],
  render: (args) => {
    return (
      <ListWrapper {...args}>
        {LIST_ITEMS.map((props) => (
          <ListItem {...props} />
        ))}
      </ListWrapper>
    );
  },
  decorators: [fixedWrapper300],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    onClick: { action: 'onClick' },
  },
  args: {
    onClick: fn(),
  },
} as Meta<ListWrapperProps>;

export const Default: Story = {};

const StyledList = styled(VariableSizeList)`
  overflow-x: unset;
  overflow-y: unset;
  height: auto !important;
`;
const Item = (listItemData: ListChildComponentProps<ListItemProps[]>) => {
  const { data, index, style } = listItemData;
  const item = data[index];
  return (
    <div style={style}>
      <ListItem {...item} />
    </div>
  );
};
export const Virtualised: Story = {
  render: (args) => {
    const listRef = useRef<VariableSizeList>(null);
    const getItemSize = (index: number) => {
      const item = LIST_ITEMS[index];
      switch (item.type) {
        case 'header':
          return 40;
        case 'divider':
          return 17;
        default:
          return 32;
      }
    };
    return (
      <ListWrapper {...args}>
        <Scrollbar
          onScroll={({ currentTarget }: UIEvent) => {
            const { scrollTop } = currentTarget;
            if (listRef.current) {
              listRef.current.scrollTo(scrollTop);
            }
          }}
          maxHeight={308}
        >
          <StyledList
            ref={listRef}
            height={308}
            itemData={LIST_ITEMS}
            itemCount={LIST_ITEMS.length}
            itemSize={getItemSize}
            width="100%"
          >
            {Item}
          </StyledList>
        </Scrollbar>
      </ListWrapper>
    );
  },
};
