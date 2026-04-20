import React, { useCallback, useState } from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, within } from '@testing-library/react';
import { type ColumnDef } from '@tanstack/react-table';

import { TreeTable } from '../TreeTable';

type TreeRow = {
  key: string;
  name: string;
  children?: TreeRow[];
};

const TREE_DATA: TreeRow[] = [
  {
    key: '1',
    name: 'Parent A',
    children: [
      { key: '1-1', name: 'Child A1' },
      {
        key: '1-2',
        name: 'Child A2',
        children: [{ key: '1-2-1', name: 'Grandchild A2a' }],
      },
    ],
  },
  {
    key: '2',
    name: 'Parent B',
    children: [{ key: '2-1', name: 'Child B1' }],
  },
  {
    key: '3',
    name: 'Leaf C',
  },
];

const COLUMNS: ColumnDef<TreeRow>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    id: 'name',
  },
];

describe('TreeTable', () => {
  it('renders top-level rows only by default (children collapsed)', () => {
    renderWithProvider(
      <TreeTable data={TREE_DATA} columns={COLUMNS} rowKey="key" />,
    );

    expect(screen.getByText('Parent A')).toBeInTheDocument();
    expect(screen.getByText('Parent B')).toBeInTheDocument();
    expect(screen.getByText('Leaf C')).toBeInTheDocument();
    // Children should NOT be visible
    expect(screen.queryByText('Child A1')).not.toBeInTheDocument();
    expect(screen.queryByText('Child B1')).not.toBeInTheDocument();
  });

  it('renders expand buttons for parent rows', () => {
    renderWithProvider(
      <TreeTable data={TREE_DATA} columns={COLUMNS} rowKey="key" />,
    );

    const expanders = document.querySelectorAll('.ds-expander');
    expect(expanders.length).toBeGreaterThanOrEqual(2);
  });

  it('renders all rows when defaultExpandAllRows is true', () => {
    renderWithProvider(
      <TreeTable
        data={TREE_DATA}
        columns={COLUMNS}
        rowKey="key"
        defaultExpandAllRows
      />,
    );

    expect(screen.getByText('Parent A')).toBeInTheDocument();
    expect(screen.getByText('Child A1')).toBeInTheDocument();
    expect(screen.getByText('Child A2')).toBeInTheDocument();
    expect(screen.getByText('Grandchild A2a')).toBeInTheDocument();
    expect(screen.getByText('Parent B')).toBeInTheDocument();
    expect(screen.getByText('Child B1')).toBeInTheDocument();
    expect(screen.getByText('Leaf C')).toBeInTheDocument();
  });

  it('expands children when clicking the expander', () => {
    const ExpandTest = () => {
      const [expanded, setExpanded] = useState<string[]>([]);
      return (
        <TreeTable
          data={TREE_DATA}
          columns={COLUMNS}
          rowKey="key"
          expandedRowKeys={expanded}
          onExpandRow={(key, isExpanded) =>
            setExpanded((prev) =>
              isExpanded ? [...prev, key] : prev.filter((k) => k !== key),
            )
          }
        />
      );
    };

    renderWithProvider(<ExpandTest />);

    // Initially collapsed
    expect(screen.queryByText('Child A1')).not.toBeInTheDocument();

    // Click first expander
    const expanders = document.querySelectorAll('.ds-expander');
    fireEvent.click(expanders[0] as HTMLElement);

    // Children should now be visible
    expect(screen.getByText('Child A1')).toBeInTheDocument();
    expect(screen.getByText('Child A2')).toBeInTheDocument();
  });

  it('collapses children when clicking expander again', () => {
    const CollapseTest = () => {
      const [expanded, setExpanded] = useState<string[]>(['1']);
      return (
        <TreeTable
          data={TREE_DATA}
          columns={COLUMNS}
          rowKey="key"
          expandedRowKeys={expanded}
          onExpandRow={(key, isExpanded) =>
            setExpanded((prev) =>
              isExpanded ? [...prev, key] : prev.filter((k) => k !== key),
            )
          }
        />
      );
    };

    renderWithProvider(<CollapseTest />);

    // Initially expanded
    expect(screen.getByText('Child A1')).toBeInTheDocument();

    // Click first expander to collapse
    const expanders = document.querySelectorAll('.ds-expander');
    fireEvent.click(expanders[0] as HTMLElement);

    // Children should be hidden
    expect(screen.queryByText('Child A1')).not.toBeInTheDocument();
  });

  it('renders controlled expandedRowKeys', () => {
    renderWithProvider(
      <TreeTable
        data={TREE_DATA}
        columns={COLUMNS}
        rowKey="key"
        expandedRowKeys={['1']}
      />,
    );

    expect(screen.getByText('Child A1')).toBeInTheDocument();
    expect(screen.getByText('Child A2')).toBeInTheDocument();
    expect(screen.queryByText('Child B1')).not.toBeInTheDocument();
  });

  it('calls onExpandRow when expander is clicked', () => {
    const onExpandRow = vi.fn();
    renderWithProvider(
      <TreeTable
        data={TREE_DATA}
        columns={COLUMNS}
        rowKey="key"
        onExpandRow={onExpandRow}
      />,
    );

    const expanders = document.querySelectorAll('.ds-expander');
    fireEvent.click(expanders[0] as HTMLElement);

    expect(onExpandRow).toHaveBeenCalledWith('1', true);
  });

  it('does not render expanders when expandIconColumnIndex is -1', () => {
    renderWithProvider(
      <TreeTable
        data={TREE_DATA}
        columns={COLUMNS}
        rowKey="key"
        expandIconColumnIndex={-1}
        defaultExpandAllRows
      />,
    );

    expect(screen.getByText('Parent A')).toBeInTheDocument();
    expect(document.querySelectorAll('.ds-expander')).toHaveLength(0);
  });

  it('supports custom childrenColumnName', () => {
    type CustomRow = { key: string; name: string; items?: CustomRow[] };
    const customData: CustomRow[] = [
      {
        key: '1',
        name: 'Root',
        items: [{ key: '1-1', name: 'Nested' }],
      },
    ];

    const columns: ColumnDef<CustomRow>[] = [
      { header: 'Name', accessorKey: 'name', id: 'name' },
    ];

    renderWithProvider(
      <TreeTable
        data={customData}
        columns={columns}
        rowKey="key"
        childrenColumnName="items"
        defaultExpandAllRows
      />,
    );

    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.getByText('Nested')).toBeInTheDocument();
  });
});
