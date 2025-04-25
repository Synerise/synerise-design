import React from 'react';
import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';

import Icon, { AddM, InfoFillS, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon';
import Table, { DSTableProps, DSColumnType, TableCell } from '@synerise/ds-table';
import Button from '@synerise/ds-button';

import { AdditionalColumnData } from '../Table.types';
import { chromaticCellRender, renderWithIconInHeaders, TableMeta } from '../Table.utils';
import { DATA_SOURCE, DATA_SOURCE_WITH_CONTAINER } from './Expandable.data';
import { useExpandableData } from './useExpandableData';
import { fixedWrapper1000 } from '../../../utils';

type RowTypeDefault = typeof DATA_SOURCE[number];
type RowTypeWithContainer = typeof DATA_SOURCE_WITH_CONTAINER[number];

type Story<RowType> = StoryObj<StoryType<RowType>>;
type StoryType<RowType> = DSTableProps<RowType> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
  columnsData: Array<any>;
  independentSelectionExpandedRows: boolean;
  randomiseSelectionColumn: boolean;
};

export default {
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
  },
  title: 'Components/Table/ExpandableRows',
  decorators: [fixedWrapper1000],
  render: ({ showIconsInHeader, showHeaderButton, randomiseSelectionColumn, independentSelectionExpandedRows, ...args }) => {
    const { selectedRows, expandedRows, handleExpandRow, handleSelectRow } = useExpandableData();
    const columnsData: (DSColumnType<RowTypeDefault> & AdditionalColumnData)[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 500,
        icon: { component: <VarTypeStringM /> },
        iconTooltip: { component: <InfoFillS /> },
        render: chromaticCellRender,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        icon: { component: <VarTypeNumberM /> },
        iconTooltip: { component: <InfoFillS /> },
        render: chromaticCellRender,
      },
      {
        dataIndex: 'children',
        key: 'children',
        width: 72,
        render: (children, record) => {
          if (children !== undefined) {
            return (
              <TableCell.ActionCell className="chromatic-ignore" key={record.key}>
                <Button.Expander
                  expanded={expandedRows.indexOf(record.key) >= 0}
                  onClick={() => {
                    handleExpandRow(record.key);
                  }}
                />
              </TableCell.ActionCell>
            );
          }
        },
      },
    ];

    const randomStatus = _record => ({ disabled: _record.disabled, unavailable: _record.unavailable });
    const columns = renderWithIconInHeaders<RowTypeDefault>(columnsData, showIconsInHeader);
    const headerButton = showHeaderButton && (
      <Button type="ghost" mode="icon-label" onClick={fn()}>
        <Icon component={<AddM />} />
        Add row
      </Button>
    );
    return (
      <Table
        {...args}
        columns={columns}
        expandable={{
          expandIconColumnIndex: -1,
          expandedRowKeys: expandedRows,
        }}
        onRow={record => ({
          onClick: () => handleExpandRow(record.key),
        })}
        selection={{
          onChange: handleSelectRow,
          selectedRowKeys: selectedRows,
          checkRowSelectionStatus: randomiseSelectionColumn ? randomStatus : undefined,
          selections: [Table.SELECTION_ALL, undefined, null, Table.SELECTION_INVERT],
          independentSelectionExpandedRows,
        }}
        headerButton={headerButton}
      />
    );
  },
  argTypes: {
    ...TableMeta.argTypes,
  },
  args: {
    ...TableMeta.args,
  },
  component: Table,
} as Meta<StoryType<RowTypeDefault>>;

export const Default: Story<RowTypeDefault> = {
  args: {
    dataSource: DATA_SOURCE,
  },
};

export const WithContainer: Story<RowTypeWithContainer> = {
  render: ({ showIconsInHeader, showHeaderButton, randomiseSelectionColumn, independentSelectionExpandedRows, ...args }) => {
    const { selectedRows, expandedRows, handleExpandRow, handleSelectRow } = useExpandableData();

    const randomStatus = _record => ({ disabled: _record.disabled, unavailable: _record.unavailable });
    const columnsData: (DSColumnType<RowTypeWithContainer> & AdditionalColumnData)[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        icon: { component: <VarTypeStringM /> },
        iconTooltip: { component: <InfoFillS /> },
        render: chromaticCellRender
      },
      {
        dataIndex: 'more',
        key: 'more',
        width: 72,
        render: (more, record) => {
          if (more !== undefined) {
            return (
              <TableCell.ActionCell className="chromatic-ignore">
                <Button.Expander
                  expanded={expandedRows.indexOf(record.key) >= 0}
                  onClick={() => {
                    handleExpandRow(record.key);
                  }}
                />
              </TableCell.ActionCell>
            );
          }
        },
      },
    ];
    const columns = renderWithIconInHeaders<RowTypeWithContainer>(columnsData, showIconsInHeader);
    const headerButton = showHeaderButton && (
      <Button type="ghost" mode="icon-label" onClick={fn()}>
        <Icon component={<AddM />} />
        Add row
      </Button>
    );
    return (
      <Table
        {...args}
        columns={columns}
        expandable={{
          expandIconColumnIndex: -1,
          expandedRowKeys: expandedRows,
          expandedRowRender: record => {
            return record.more?.text;
          },
        }}
        onRow={record =>
          record.more
            ? {
                onClick: () => handleExpandRow(record.key),
              }
            : {}
        }
        selection={{
          onChange: handleSelectRow,
          selectedRowKeys: selectedRows,
          checkRowSelectionStatus: randomiseSelectionColumn ? randomStatus : undefined,
          selections: [Table.SELECTION_ALL, undefined, null, Table.SELECTION_INVERT],
          independentSelectionExpandedRows,
        }}
        headerButton={headerButton}
      />
    );
  },
  args: {
    dataSource: DATA_SOURCE_WITH_CONTAINER,
    
  },
};
