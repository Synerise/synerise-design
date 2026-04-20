import React, { useCallback, useState } from 'react';

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { TreeTable, type TreeTableProps } from '@synerise/ds-table-new';
import { type ColumnDef } from '@tanstack/react-table';

import { BOOLEAN_CONTROL } from '../../../utils';

type TreeRow = {
  key: string;
  name: string;
  type?: string;
  status?: string;
  children?: TreeRow[];
};

const TREE_DATA: TreeRow[] = [
  {
    key: 'analytics',
    name: 'Analytics',
    type: 'module',
    children: [
      {
        key: 'analytics-dashboards',
        name: 'Dashboards',
        type: 'feature',
        status: 'active',
      },
      {
        key: 'analytics-funnels',
        name: 'Funnels',
        type: 'feature',
        status: 'active',
      },
      {
        key: 'analytics-segmentations',
        name: 'Segmentations',
        type: 'feature',
        status: 'active',
        children: [
          {
            key: 'analytics-seg-create',
            name: 'Create segmentation',
            type: 'action',
            status: 'active',
          },
          {
            key: 'analytics-seg-delete',
            name: 'Delete segmentation',
            type: 'action',
            status: 'inactive',
          },
        ],
      },
    ],
  },
  {
    key: 'campaigns',
    name: 'Campaigns',
    type: 'module',
    children: [
      {
        key: 'campaigns-email',
        name: 'Email',
        type: 'feature',
        status: 'active',
      },
      {
        key: 'campaigns-push',
        name: 'Push',
        type: 'feature',
        status: 'active',
      },
      {
        key: 'campaigns-sms',
        name: 'SMS',
        type: 'feature',
        status: 'inactive',
      },
    ],
  },
  {
    key: 'settings',
    name: 'Settings',
    type: 'module',
    children: [
      {
        key: 'settings-users',
        name: 'Users',
        type: 'feature',
        status: 'active',
      },
      {
        key: 'settings-api',
        name: 'API Keys',
        type: 'feature',
        status: 'active',
      },
    ],
  },
];

const COLUMNS: ColumnDef<TreeRow>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    id: 'name',
    minSize: 300,
  },
  {
    header: 'Type',
    accessorKey: 'type',
    id: 'type',
    size: 150,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    id: 'status',
    size: 150,
  },
];

const SINGLE_COLUMN: ColumnDef<TreeRow>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    id: 'name',
  },
];

export default {
  component: TreeTable,
  title: 'Components/TableNew/Examples/TreeTable',
  tags: ['new'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    defaultExpandAllRows: BOOLEAN_CONTROL,
    hideColumnNames: BOOLEAN_CONTROL,
    hideTitleBar: BOOLEAN_CONTROL,
  },
} as Meta<TreeTableProps<TreeRow, unknown>>;

export const Default: StoryObj<TreeTableProps<TreeRow, unknown>> = {
  args: {
    data: TREE_DATA,
    columns: COLUMNS,
    rowKey: 'key',
    title: 'Permissions',
  },
};

export const AllExpanded: StoryObj<TreeTableProps<TreeRow, unknown>> = {
  args: {
    ...Default.args,
    defaultExpandAllRows: true,
  },
};

export const SingleColumn: StoryObj<TreeTableProps<TreeRow, unknown>> = {
  args: {
    data: TREE_DATA,
    columns: SINGLE_COLUMN,
    rowKey: 'key',
    hideTitleBar: true,
    hideColumnNames: true,
    defaultExpandAllRows: true,
  },
};

export const ControlledExpand: StoryObj<TreeTableProps<TreeRow, unknown>> = {
  render: (args) => {
    const [expandedKeys, setExpandedKeys] = useState<string[]>(['analytics']);

    const handleExpandRow = useCallback((key: string, expanded: boolean) => {
      setExpandedKeys((prev) =>
        expanded ? [...prev, key] : prev.filter((k) => k !== key),
      );
    }, []);

    return (
      <TreeTable
        {...args}
        expandedRowKeys={expandedKeys}
        onExpandRow={handleExpandRow}
      />
    );
  },
  args: {
    data: TREE_DATA,
    columns: COLUMNS,
    rowKey: 'key',
    title: 'Controlled expand',
  },
};

export const HiddenExpandIcon: StoryObj<TreeTableProps<TreeRow, unknown>> = {
  render: (args) => {
    const [expandedKeys, setExpandedKeys] = useState<string[]>(
      TREE_DATA.map((r) => r.key),
    );

    const handleRowClick = useCallback((row: TreeRow) => {
      const key = row.key;
      setExpandedKeys((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
      );
    }, []);

    return (
      <TreeTable
        {...args}
        expandedRowKeys={expandedKeys}
        onExpandRow={(key, expanded) =>
          setExpandedKeys((prev) =>
            expanded ? [...prev, key] : prev.filter((k) => k !== key),
          )
        }
        onRowClick={handleRowClick}
      />
    );
  },
  args: {
    data: TREE_DATA,
    columns: SINGLE_COLUMN,
    rowKey: 'key',
    expandIconColumnIndex: -1,
    hideTitleBar: true,
    hideColumnNames: true,
  },
};

export const WithSearch: StoryObj<TreeTableProps<TreeRow, unknown>> = {
  args: {
    data: TREE_DATA,
    columns: COLUMNS,
    rowKey: 'key',
    title: 'Permissions',
    defaultExpandAllRows: true,
    matchesSearchQuery: (query: string, row: TreeRow) =>
      row.name.toLowerCase().includes(query.toLowerCase()),
    searchProps: {
      placeholder: 'Search permissions...',
      clearTooltip: 'Clear',
    },
  },
};
