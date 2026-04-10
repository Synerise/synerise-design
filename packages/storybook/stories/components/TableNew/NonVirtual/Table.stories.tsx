import React, { useCallback, useMemo, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { SELECTION_ALL, SELECTION_INVERT, Table } from '@synerise/ds-table-new';

import { BOOLEAN_CONTROL, REACT_NODE_AS_STRING } from '../../../utils';
import {
  COLUMNS_ALL,
  COLUMNS_MULTIPLE_SORT,
  RAW_TABLE_COLUMNS,
  RESPONSIVE_COLUMNS,
} from '../data/columns';
import { type DataSourceItem, TOOLTIP_COLUMNS } from '../data/columns.tooltips';
import { DATA_SOURCE, DATA_SOURCE_FULL } from '../data/tableData';

export default {
  component: Table,
  title: 'Components/TableNew/Examples/NonVirtual',
  tags: ['autodocs', 'new'],
  parameters: {
    layout: 'padded',
  },
  args: {},
  argTypes: {
    columns: { control: false },
    data: { control: false },
    texts: { control: false },

    enableVirtualization: BOOLEAN_CONTROL,
    headerWithBorderTop: BOOLEAN_CONTROL,
    hideColumnNames: BOOLEAN_CONTROL,
    hideTitleBar: BOOLEAN_CONTROL,
    hideTitlePart: BOOLEAN_CONTROL,
    isCounterLoading: BOOLEAN_CONTROL,
    isLoading: BOOLEAN_CONTROL,

    itemsMenu: REACT_NODE_AS_STRING,
    headerButton: REACT_NODE_AS_STRING,
    title: REACT_NODE_AS_STRING,
    filterComponent: REACT_NODE_AS_STRING,
    searchComponent: REACT_NODE_AS_STRING,
  },
} as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE_FULL,
    columns: COLUMNS_ALL,
  },
};

export const WithSelection: StoryObj<typeof Table> = {
  args: {
    ...Default.args,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
};

export const WithLimitedSelection: StoryObj<typeof Table> = {
  args: {
    ...Default.args,
    selectionConfig: {
      limit: 5,
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
};

export const WithGlobalSelection: StoryObj<typeof Table> = {
  render: ({ selectionConfig, ...args }) => {
    const [globalAllSelected, setGlobalAllSelected] = useState(
      !!selectionConfig?.globalSelected,
    );
    const handleGlobalSelectionChange = useCallback((newState: boolean) => {
      selectionConfig?.globalSelectionOnChange?.(newState);
      setGlobalAllSelected(newState);
    }, []);
    const selectionConfigMemoised = useMemo(
      () => ({
        ...selectionConfig,
        globalSelected: globalAllSelected,
        globalSelectionOnChange: handleGlobalSelectionChange,
      }),
      [globalAllSelected, handleGlobalSelectionChange],
    );
    return <Table selectionConfig={selectionConfigMemoised} {...args} />;
  },
  args: {
    ...Default.args,
    selectionConfig: {
      globalSelectionOnChange: (...rest) => {
        console.log('sel', rest);
      },
      globalSelected: false,
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [],
    },
  },
};

export const MultipleColumnSort: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: COLUMNS_MULTIPLE_SORT,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
};

export const ResponsiveColumns: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: RESPONSIVE_COLUMNS,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
};

export const Empty: StoryObj<typeof Table> = {
  args: {
    data: [],
    columns: RESPONSIVE_COLUMNS,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
};

export const EmptyCustom: StoryObj<typeof Table> = {
  args: {
    data: [],
    columns: RESPONSIVE_COLUMNS,
    emptyDataComponent: <p>Empty custom</p>,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
};

export const LoadingData: StoryObj<typeof Table> = {
  args: {
    data: [],
    isLoading: true,
    columns: RESPONSIVE_COLUMNS,
    emptyDataComponent: <p>Empty custom</p>,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
};
export const LoadingConfig: StoryObj<typeof Table> = {
  args: {
    data: [],
    columns: [],
    isLoading: true,
    emptyDataComponent: <p>Empty custom</p>,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
};

export const RawTable: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: RAW_TABLE_COLUMNS,
  },
};

export const WithTooltips: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: TOOLTIP_COLUMNS,
    title: 'Tooltips demo',
    getRowTooltipProps: (row: DataSourceItem) =>
      row.disabled ? { title: `Row ${row.name} is disabled` } : false,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
      getSelectionTooltipProps: (row: DataSourceItem) =>
        row.unavailable
          ? { title: `Cannot select ${row.name} — unavailable` }
          : false,
    },
  },
};
