import React, { Key, useEffect, useMemo, useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions';

import Button from '@synerise/ds-button';
import Layout from '@synerise/ds-layout';
import Icon, { AddM } from '@synerise/ds-icon';
import Table, { VirtualTableProps, VirtualTable, VirtualTableRef } from '@synerise/ds-table';
import { SearchInput } from '@synerise/ds-search';

import { COLUMNS, DATA_SOURCE, FIXED_COLUMNS } from './VirtualTable.data';
import { renderWithIconInHeaders } from './Table.utils';
import { FixedSizeList } from 'react-window';
import { doc } from 'prettier';

type RowType = typeof DATA_SOURCE[number];
type VirtualTableType = VirtualTableProps<RowType>;
type Story = StoryObj<VirtualTableType>;

const defaultRender = args => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [starredRowKeys, setStarredRowKey] = useState<string[]>([]);

  const { dataSourceFull, selection, rowStar } = args;
  const handleSelectionChange = (selectedRowKeys: Key[], selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    selection?.onChange?.(selectedRowKeys, selectedRows);
  };
  const selectionProp = selection
    ? {
        ...selection,
        onChange: handleSelectionChange,
        selectedRowKeys: selectedRowKeys,
      }
    : undefined;
  const rowStarProp = rowStar
    ? {
        starredRowKeys: starredRowKeys,
        onChange: (starredRowKeys: string[]): void => {
          setStarredRowKey(starredRowKeys);
        },
      }
    : undefined;

  const dataSource = useMemo(() => {
    return !searchValue
      ? dataSourceFull
      : dataSourceFull?.filter(record => {
          return typeof record.name === 'string' && record.name.toLowerCase().includes(searchValue.toLowerCase());
        });
  }, [searchValue, dataSourceFull]);

  return (
    <div style={{ width: '100%' }}>
      <VirtualTable
        {...args}
        dataSource={dataSource}
        selection={selectionProp}
        rowStar={rowStarProp}
        searchComponent={
          <SearchInput
            placeholder="Search"
            clearTooltip="Clear"
            onChange={(value: string) => {
              setSearchValue(value);
            }}
            value={searchValue}
            onClear={() => {
              setSearchValue('');
            }}
            closeOnClickOutside={true}
            inputProps={{ autoFocus: false }}
          />
        }
      />
    </div>
  );
};
export default {
  title: 'Components/Table/VirtualTable',
  tags: ['autodocs'],
  argTypes: {
    onRowClick: {
      action: 'onRowClick',
    },
  },
  render: defaultRender,
  args: {
    dataSourceFull: DATA_SOURCE,
    scroll: { y: 500, x: 0 },
    initialWidth: 792,
    cellHeight: 51,
    rowKey: row => row.key,
    onSort: fn(),
    title: 'Virtualized table',
    columns: COLUMNS,
  },
  component: VirtualTable,
} as Meta<VirtualTableType>;

export const Default: Story = {};

export const ColumnsWithIcons: Story = {
  args: {
    columns: renderWithIconInHeaders(COLUMNS),
  },
};

export const WithRowStar: Story = {
  args: {
    rowStar: {
      starredRowKeys: [],
      onChange: fn(),
    },
  },
};

export const WithSelection: Story = {
  args: {
    selection: {
      onChange: fn(),
      selectedRowKeys: [],
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      limit: 5,
    },
  },
};

export const WithFixedColumns: Story = {
  args: {
    columns: FIXED_COLUMNS,
  },
};

export const WithHeaderButton: Story = {
  args: {
    headerButton: (
      <Button type="ghost" mode="icon-label" onClick={action('headerButton onClick')}>
        <Icon component={<AddM />} />
        Add row
      </Button>
    ),
    columns: COLUMNS,
  },
};
const PADDING = 20;
const DEFAULT_SCROLLABLE_HEIGHT = 800;

export const WithStickyHeader: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: args => {
    const [scrollableHeight, setScrollableHeight] = useState(DEFAULT_SCROLLABLE_HEIGHT);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const virtualListRef = useRef<FixedSizeList | null>(null);
    const virtualTableRefs = useRef<VirtualTableRef>();
    const listOuterRef = useRef<HTMLDivElement | null>(null);
    const STICKY_SCROLL_THRESHOLD = 73;

    useEffect(() => {
      if (virtualTableRefs.current) {
        virtualListRef.current = virtualTableRefs.current.virtualListRef.current;
        listOuterRef.current = virtualTableRefs.current.outerListRef.current;
        listOuterRef.current && (listOuterRef.current.style.overflow = 'visible');
      }
    });

    const scrollTableContent = useRef((event: Event) => {
      if (virtualTableRefs.current && containerRef.current) {
        virtualTableRefs.current.scrollTo(containerRef.current.scrollTop - STICKY_SCROLL_THRESHOLD);
      }
    }).current;

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.addEventListener('scroll', scrollTableContent);
        setScrollableHeight(containerRef.current.offsetHeight - STICKY_SCROLL_THRESHOLD - PADDING);
      }
      return () => {
        containerRef.current && containerRef.current.removeEventListener('scroll', scrollTableContent);
      };
    }, []);

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          maxWidth: '1000px',
          overflowY: 'scroll',
          padding: PADDING,
          boxSizing: 'border-box',
        }}
        ref={containerRef}
      >
        {defaultRender({
          ...args,
          ref: virtualTableRefs,
          scroll: {
            y: scrollableHeight,
          },
          sticky: {
            offsetHeader: -PADDING,
            offsetScroll: PADDING - 4,
            scrollThreshold: STICKY_SCROLL_THRESHOLD,
            getContainer: () => containerRef && containerRef.current,
          },
        })}
      </div>
    );
  },
  args: {
    ...WithSelection.args,
    ...WithRowStar.args,
  },
};
