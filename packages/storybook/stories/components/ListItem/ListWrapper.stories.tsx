import React, { type UIEvent, useRef } from 'react';
import { ListChildComponentProps, VariableSizeList } from 'react-window';
import { fn } from 'storybook/test';
import styled from 'styled-components';

import { Meta, StoryObj } from '@storybook/react-vite';
import ListItem, {
  ListItemProps,
  ListWrapper,
  ListWrapperProps,
} from '@synerise/ds-list-item';
import Scrollbar from '@synerise/ds-scrollbar';

import { CLASSNAME_ARG_CONTROL, fixedWrapper300 } from '../../utils';
import { LIST_ITEMS } from './listItem.data';

type Story = StoryObj<ListWrapperProps>;

export default {
  component: ListWrapper,
  title: 'Components/ListItem/ListWrapper',
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

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import ListItem, { ListWrapper } from '@synerise/ds-list-item';

<ListWrapper onClick={(itemData) => console.log(itemData.key)}>
  <ListItem itemKey="a">Option A</ListItem>
  <ListItem itemKey="b" checked>Option B</ListItem>
  <ListItem type="divider" />
  <ListItem type="header">Section</ListItem>
  <ListItem itemKey="c">Option C</ListItem>
</ListWrapper>`,
      },
    },
  },
};

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
export const WithMaxToShowItems: Story = {
  args: {
    maxToShowItems: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `maxToShowItems` to limit visible items. A show-more/show-less toggle appears when there are more items than the limit. `maxToShowItems` counts direct children only, so keep `ListItem`s as direct children of `ListWrapper`.',
      },
      source: {
        code: `import ListItem, { ListWrapper } from '@synerise/ds-list-item';

// Only the first 3 items are shown; a "Show more" toggle reveals the rest.
// maxToShowItems counts direct children, so keep ListItems as direct children.
<ListWrapper maxToShowItems={3} onClick={(itemData) => console.log(itemData.key)}>
  <ListItem itemKey="a">Option A</ListItem>
  <ListItem itemKey="b">Option B</ListItem>
  <ListItem itemKey="c">Option C</ListItem>
  <ListItem itemKey="d">Option D</ListItem>
  <ListItem itemKey="e">Option E</ListItem>
</ListWrapper>`,
      },
    },
  },
};

export const Virtualised: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Compose the children prop with a virtualised renderer (e.g. `react-window`) for very long lists. Shared `onClick` still propagates through context. Because the list is a single composed child, `maxToShowItems` does not apply to this pattern.',
      },
      source: {
        code: `import React, { useRef } from 'react';
import { VariableSizeList } from 'react-window';
import ListItem, { ListWrapper } from '@synerise/ds-list-item';
import Scrollbar from '@synerise/ds-scrollbar';

const listRef = useRef(null);

<ListWrapper onClick={(itemData) => console.log(itemData.key)}>
  <Scrollbar
    maxHeight={308}
    onScroll={({ currentTarget }) => listRef.current?.scrollTo(currentTarget.scrollTop)}
  >
    <VariableSizeList
      ref={listRef}
      height={308}
      itemData={items}
      itemCount={items.length}
      itemSize={(index) => (items[index].type === 'header' ? 40 : 32)}
      width="100%"
    >
      {({ data, index, style }) => (
        <div style={style}>
          <ListItem {...data[index]} />
        </div>
      )}
    </VariableSizeList>
  </Scrollbar>
</ListWrapper>`,
      },
    },
  },
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
