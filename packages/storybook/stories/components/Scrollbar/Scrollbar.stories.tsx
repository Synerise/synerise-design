import React, { UIEvent, useState } from 'react';
import { FixedSizeList } from 'react-window';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import List from '@synerise/ds-list';
import Scrollbar, { ScrollbarProps } from '@synerise/ds-scrollbar';
import Sortable from '@synerise/ds-sortable';

import { fixedWrapper300 } from '../../utils';
import {
  INITIAL_DATA,
  ItemType,
  getContent,
  getData,
  renderItem,
} from './Scrollbar.data';

type Story = StoryObj<ScrollbarProps>;

export default {
  component: Scrollbar,
  title: 'Components/Scrollbar',
  tags: ['autodocs'],

  decorators: [fixedWrapper300],
  render: (args) => {
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
    maxHeight: undefined,
  },
};

export const Absolute: Story = {
  args: {
    absolute: true,
  },
};

export const DndScrollbar: Story = {
  name: 'DnD Scrollbar',
  render: (args) => {
    const [data, setData] = useState(INITIAL_DATA);

    return (
      <Scrollbar {...args}>
        <Sortable
          axis="y"
          onOrderChange={setData}
          items={data}
          ItemComponent={(item) => {
            return renderItem(item);
          }}
        />
      </Scrollbar>
    );
  },
  args: {
    withDnd: true,
  },
};

export const Horizontal: Story = {
  args: {
    children: getContent('horizontal'),
    maxHeight: undefined,
  },
};

export const InfiniteScrollbar: Story = {
  render: (args) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(INITIAL_DATA);
    const fetchMoreData = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setData([...data, ...getData()]);
      }, 2000);
    };
    const getItem = (item) => {
      return <List.Item className="chromatic-ignore">{item.name}</List.Item>;
    };
    return (
      <Scrollbar
        {...args}
        hasMore={1000 > data.length}
        fetchData={fetchMoreData}
        loading={loading}
      >
        <List renderItem={getItem} dataSource={[data]}></List>
      </Scrollbar>
    );
  },
  args: {},
};

export const VirtualisedList: Story = {
  render: (args) => {
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
              <span
                className="chromatic-ignore"
                key={`${item.name}-${index}`}
                style={style}
              >
                {index}.{item.name}
              </span>
            );
          }}
        </FixedSizeList>
      </Scrollbar>
    );
  },
};
