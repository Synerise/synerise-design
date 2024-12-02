import React, { useState, UIEvent } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ReactSortable } from 'react-sortablejs';
import { FixedSizeList } from 'react-window';

import List from '@synerise/ds-list';
import Scrollbar, { ScrollbarProps } from '@synerise/ds-scrollbar';

import { fixedWrapper300 } from '../../utils';
import { getContent, getData, INITIAL_DATA, ItemType, renderItem, SORTABLE_CONFIG } from './Scrollbar.data';

type Story = StoryObj<ScrollbarProps>;

export default {
  component: Scrollbar,
  title: 'Components/Scrollbar',
  tags: ['autodocs'],

  decorators: [fixedWrapper300],
  render: args => {
    return <Scrollbar {...args} />;
  },
  argTypes: {},
  args: {
    children: getContent('vertical'),
    maxHeight: 250,

    classes: 'test',
  },
} as Meta<ScrollbarProps>;

export const Default: Story = {};

export const LargeSize: Story = {
  args: {
    largeSize: true,
    children: getContent('horizontal'),
    maxWidth: 300,
    maxHeight: undefined
  },
};

export const Absolute: Story = {
  args: {
    absolute: true,
  },
};

export const DndScrollbar: Story = {
  name: 'DnD Scrollbar',
  render: args => {
    const [data, setData] = useState(INITIAL_DATA);
    const handleChangeOrder = (newOrder: ItemType[]) => {
      setData(newOrder);
    };
    return (
      <Scrollbar {...args}>
        <ReactSortable {...SORTABLE_CONFIG} list={data} setList={handleChangeOrder}>
          {data.map(renderItem)}
        </ReactSortable>
      </Scrollbar>
    );
  },
  args: {
    withDnd: true,
  },
};

export const Horizontal: Story = {
  args: {
    maxWidth: 300,
    children: getContent('horizontal'),
    maxHeight: undefined,
  },
};

export const InfiniteScrollbar: Story = {
  render: args => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(INITIAL_DATA);
    const fetchMoreData = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setData([...data, ...getData()]);
      }, 2000);
    };
    const getItem = item => {
      return <List.Item>{item.name}</List.Item>;
    };
    return (
      <Scrollbar {...args} hasMore={1000 > data.length} fetchData={fetchMoreData} loading={loading}>
        <List renderItem={getItem} dataSource={[data]}></List>
      </Scrollbar>
    );
  },
  args: {},
};

export const VirtualisedList: Story = {
  render: args => {
    const listRef = React.createRef<FixedSizeList>();

    const handleScroll = ({ currentTarget }: UIEvent) => {
      const { scrollTop } = currentTarget;
      if (listRef.current !== null) {
        listRef.current.scrollTo(scrollTop);
      }
    };

    return (
      <Scrollbar {...args} onScroll={handleScroll}>
        <FixedSizeList
          width="100%"
          height={250}
          itemCount={INITIAL_DATA.length}
          itemSize={40}
          ref={listRef}
          style={{ overflowX: 'unset', overflowY: 'unset' }}
        >
          {({ index, style }) => {
            const item = INITIAL_DATA[index];
            return (
              <span key={`${item.name}-${index}`} style={style}>
                {index}.{item.name}
              </span>
            );
          }}
        </FixedSizeList>
      </Scrollbar>
    );
  },
};
