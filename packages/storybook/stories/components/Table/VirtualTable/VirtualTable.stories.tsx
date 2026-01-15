import isChromatic from 'chromatic/isChromatic';
import React, { Key, useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { action } from 'storybook/actions';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import Icon, { AddM, EditM, FileDownloadM, TrashM } from '@synerise/ds-icon';
import { SearchInput } from '@synerise/ds-search';
import Table, {
  ItemsMenu,
  VirtualTable,
  VirtualTableProps,
  VirtualTableRef,
} from '@synerise/ds-table';

import { fixedWrapper1000, responsiveTableWrapper } from '../../../utils';
import { TableMeta, renderWithIconInHeaders } from '../Table.utils';
import {
  COLUMNS,
  DATA_SOURCE,
  FIXED_COLUMNS,
  RESPONSIVE_COLUMNS,
  RefreshCount,
} from './VirtualTable.data';
import { useInfiniteScroll } from './useInfiniteScroll';

type RowType = (typeof DATA_SOURCE)[number];
type VirtualTableType = VirtualTableProps<RowType> & {
  randomiseSelectionColumn?: boolean;
};
type Story = StoryObj<VirtualTableType>;

const randomStatus = (_record) => ({
  disabled: _record.disabled,
  unavailable: _record.unavailable,
});

const defaultRender: Meta<VirtualTableType>['render'] = (args) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [starredRowKeys, setStarredRowKey] = useState<string[]>([]);
  const [isGlobalAllSelected, setIsGlobalAllSelected] = useState(false);

  const { dataSourceFull, selection, rowStar, randomiseSelectionColumn } = args;
  const handleSelectionChange = (selectedRowKeys: Key[], selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    selection?.onChange?.(selectedRowKeys, selectedRows);
  };
  const selectionProp = selection
    ? {
        ...selection,
        onChange: handleSelectionChange,
        checkRowSelectionStatus: randomiseSelectionColumn
          ? randomStatus
          : undefined,
        selectedRowKeys: selectedRowKeys,
        globalSelection: selection.globalSelection
          ? {
              ...selection.globalSelection,
              isSelected: isGlobalAllSelected,
              onChange: (newState: boolean) => {
                setIsGlobalAllSelected(newState);
                action('global all', newState);
                selection.globalSelection.onChange(newState);
              },
            }
          : undefined,
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
      : dataSourceFull?.filter((record) => {
          return (
            typeof record.name === 'string' &&
            record.name.toLowerCase().includes(searchValue.toLowerCase())
          );
        });
  }, [searchValue, dataSourceFull]);

  return (
    <div style={{ width: '100%' }}>
      <VirtualTable
        {...args}
        dataSource={dataSource}
        selection={selectionProp}
        rowStar={rowStarProp}
        getRowTooltip={(rowData: (typeof DATA_SOURCE)[number]) => {
          return rowData.unavailable || rowData.disabled
            ? {
                placement: 'topLeft',
                align: { offset: [15, 0] },
                title: 'This item cannot be selected',
              }
            : false;
        }}
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
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
    controls: {
      exclude: ['randomiseSelectionColumn'],
    },
  },
  title: 'Components/Table/VirtualTable',
  render: defaultRender,
  argTypes: {
    ...TableMeta.argTypes,
  },
  args: {
    ...TableMeta.args,
    dataSourceFull: DATA_SOURCE,
    scroll: { y: 500, x: 0 },
    initialWidth: 792,
    cellHeight: 51,
    rowKey: (row) => row.key,
    onSort: fn(),
    title: 'Virtualized table',
    columns: COLUMNS,
  },
  component: VirtualTable,
} as Meta<VirtualTableType>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    dataSourceFull: [],
  },
};

export const HiddenBatchSelection: Story = {
  parameters: {
    controls: {
      exclude: [],
    },
  },
  args: {
    selection: {
      hideSelectAll: true,
      onChange: fn(),
      selectedRowKeys: [],
    },
  },
};

export const Skeleton: Story = {
  args: {
    dataSourceFull: [],
    loading: true,
  },
};

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
  parameters: {
    controls: {
      exclude: [],
    },
  },
  args: {
    selection: {
      onChange: fn(),
      selectedRowKeys: [],
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
    },
    itemsMenu: (
      <ItemsMenu>
        <Button onClick={fn()} type="secondary" mode="icon-label">
          <Icon component={<FileDownloadM />} />
          Export
        </Button>
        <Button onClick={fn()} type="secondary" mode="icon-label">
          <Icon component={<EditM />} />
          Edit
        </Button>
        <Button onClick={fn()} type="secondary" mode="icon-label">
          <Icon component={<TrashM />} />
          Delete
        </Button>
      </ItemsMenu>
    ),
  },
};

export const WithSelectionGlobal: Story = {
  parameters: {
    controls: {
      exclude: [],
    },
  },
  args: {
    ...WithSelection.args,
    selection: {
      onChange: fn(),
      selectedRowKeys: [],
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      globalSelection: {
        isSelected: true,
        onChange: fn(),
      },
    },
  },
};

export const WithSelectionLimit: Story = {
  parameters: {
    controls: {
      exclude: [],
    },
  },
  args: {
    ...WithSelection.args,
    selection: {
      onChange: fn(),
      selectedRowKeys: [],
      selections: [Table.SELECTION_ALL],
      limit: 10,
    },
  },
};

export const WithCustomCounter: Story = {
  parameters: {
    controls: {
      exclude: [],
    },
  },
  args: {
    ...WithSelection.args,
    renderCustomCounter: ({ count }) => <RefreshCount count={count} />,
    selection: {
      onChange: fn(),
      selectedRowKeys: [],
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      globalSelection: {
        isSelected: true,
        onChange: fn(),
      },
    },
  },
};

export const WithFixedColumns: Story = {
  args: {
    columns: FIXED_COLUMNS,
  },
};

export const WithResponsiveColumns: Story = {
  decorators: [responsiveTableWrapper],
  args: {
    cellHeight: 65,
    columns: RESPONSIVE_COLUMNS,
  },
};

export const WithHeaderButton: Story = {
  args: {
    headerButton: (
      <Button
        type="ghost"
        mode="icon-label"
        onClick={action('headerButton onClick')}
      >
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
    controls: {
      exclude: [],
    },
  },
  render: (args, context) => {
    const [scrollableHeight, setScrollableHeight] = useState(
      DEFAULT_SCROLLABLE_HEIGHT,
    );
    const containerRef = useRef<HTMLDivElement | null>(null);
    const virtualListRef = useRef<FixedSizeList | null>(null);
    const virtualTableRefs = useRef<VirtualTableRef>();
    const listOuterRef = useRef<HTMLDivElement | null>(null);
    const STICKY_SCROLL_THRESHOLD = 73;

    useEffect(() => {
      if (virtualTableRefs.current) {
        virtualListRef.current =
          virtualTableRefs.current.virtualListRef.current;
        listOuterRef.current = virtualTableRefs.current.outerListRef.current;
        listOuterRef.current &&
          (listOuterRef.current.style.overflow = 'visible');
      }
    });

    const scrollTableContent = useRef((event: Event) => {
      if (virtualTableRefs.current && containerRef.current) {
        virtualTableRefs.current.scrollTo(
          containerRef.current.scrollTop - STICKY_SCROLL_THRESHOLD,
        );
      }
    }).current;

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.addEventListener('scroll', scrollTableContent);
        setScrollableHeight(
          containerRef.current.offsetHeight - STICKY_SCROLL_THRESHOLD - PADDING,
        );
      }
      return () => {
        containerRef.current &&
          containerRef.current.removeEventListener(
            'scroll',
            scrollTableContent,
          );
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
        {defaultRender(
          {
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
          },
          context,
        )}
      </div>
    );
  },
  args: {
    ...WithSelection.args,
    ...WithRowStar.args,
  },
};

type InfiniteScrollRowType = {
  name: string;
  price: string;
  color: string;
};

const renderColumn = (value) => <div className="chromatic-ignore">{value}</div>;

export const WithInfiniteScroll: StoryObj<
  VirtualTableProps<InfiniteScrollRowType>
> = {
  render: (args) => {
    const {
      dataSource,
      prevPage,
      nextPage,
      fakeFetchNextPageData,
      fakeFetchPrevPageData,
    } = useInfiniteScroll();
    return (
      <div style={{ width: '100%' }}>
        <VirtualTable
          {...args}
          infiniteScroll={{
            hasError: false,
            hasMore: false,
            isLoading: false,

            nextPage,
            prevPage,
            showBackToTopButton: true,
            onRetryButtonClick: () => {
              fakeFetchNextPageData();
            },
            onScrollTopReach: () => {
              if (prevPage.hasMore && !isChromatic()) {
                fakeFetchPrevPageData();
              }
            },
            onScrollEndReach: () => {
              if (nextPage.hasMore && !isChromatic()) {
                fakeFetchNextPageData();
              }
            },
          }}
          dataSource={dataSource}
        />
      </div>
    );
  },
  args: {
    columns: [
      { title: 'Name', key: 'name', dataIndex: 'name', render: renderColumn },
      {
        title: 'Price',
        key: 'price',
        dataIndex: 'price',
        render: renderColumn,
      },
      {
        title: 'Color',
        key: 'color',
        dataIndex: 'color',
        render: renderColumn,
      },
    ],
  },
};
