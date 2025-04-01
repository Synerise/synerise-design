import React, { ReactNode } from 'react';
import { fn } from '@storybook/test';

import { IconProps } from '@synerise/ds-icon';
import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';
import { theme } from '@synerise/ds-core';
import { TableCell, DSColumnType } from '@synerise/ds-table';

import { AdditionalColumnData } from './Table.types';
import {
  BOOLEAN_CONTROL,
  STYLE_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  CLASSNAME_ARG_CONTROL,
  STRING_CONTROL,
  NUMBER_CONTROL,
  controlFromOptionsArray,
} from '../../utils';

export type Column = {
  title: ReactNode;
  key: string;
  dataIndex: string;
  width: string | number;
  sorter: Function;
  render: Function;
  icon: IconProps;
  tooltip: TooltipExtendedProps;
  iconTooltip: IconProps;
};

export const chromaticCellRender = (record: ReactNode) => <div className="chromatic-ignore">{record}</div>;

const renderAlertTooltip = (title: ReactNode, description: ReactNode) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: theme.palette['grey-200'],
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          fontWeight: 500,
          marginBottom: '2px',
        }}
      >
        <span>{title}</span>
      </div>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>{description}</div>
    </div>
  );
};

export const renderWithIconInHeaders = <RowType extends any>(
  columns: (DSColumnType<RowType> & AdditionalColumnData)[],
  renderIcons?: boolean
): DSColumnType<RowType>[] => {
  return columns.map(col => ({
    ...col,
    title: renderIcons ? (
      <TableCell.IconTooltipCell
        label={col.title}
        icon={col.icon}
        tooltipIcon={col.iconTooltip}
        tooltip={
          col.iconTooltip && {
            ...col.tooltip,
            type: 'largeSimple',
            offset: 'small',
            description: renderAlertTooltip('FieldID', 'Lorem ipsum'),
          }
        }
      />
    ) : (
      col.title
    ),
    icon: undefined,
    iconTooltip: undefined,
    tooltip: undefined,
    textWrap: undefined,
  }));
};
const STORY_ARG_TYPE = { table: { category: 'Story options' } };
export const TableMeta = {
  parameters: {
    chromatic: { diffThreshold: 0.25 },
    layout: 'padded',
  },
  argTypes: {
    onSort: {
      action: 'onSort',
    },
    showHeaderButton: {
      ...STORY_ARG_TYPE,
      ...BOOLEAN_CONTROL,
    },
    showIconsInHeader: {
      ...STORY_ARG_TYPE,
      ...BOOLEAN_CONTROL,
    },
    columnsData: {
      ...STORY_ARG_TYPE,
      control: false,
    },
    dataSource: { control: false },
    dataSourceFull: { control: false },
    columns: { control: false },
    childrenColumnName: NUMBER_CONTROL,
    bordered: BOOLEAN_CONTROL,
    defaultExpandAllRows: BOOLEAN_CONTROL,
    defaultExpandRowKeys: BOOLEAN_CONTROL,
    grouped: BOOLEAN_CONTROL,
    hideColumnNames: BOOLEAN_CONTROL,
    hideGroupExpander: BOOLEAN_CONTROL,
    loading: BOOLEAN_CONTROL,
    showHeader: BOOLEAN_CONTROL,
    style: STYLE_ARG_CONTROL,
    title: REACT_NODE_AS_STRING,
    headerWithBorderTop: BOOLEAN_CONTROL,
    hideTitleBar: BOOLEAN_CONTROL,
    roundedHeader: BOOLEAN_CONTROL,
    hideTitlePart: BOOLEAN_CONTROL,
    initialGroupsCollapsed: BOOLEAN_CONTROL,
    disableColumnNamesLineBreak: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    prefixCls: CLASSNAME_ARG_CONTROL,
    dropdownPrefixCls: STRING_CONTROL,
    search: STRING_CONTROL,
    dataSourceTotalCount: NUMBER_CONTROL,
    emptyDataComponent: { control: false },
    filterComponent: { control: false },
    searchComponent: { control: false },
    expandable: { control: false },
    indentSize: NUMBER_CONTROL,
    maxHeight: NUMBER_CONTROL,
    cellSize: controlFromOptionsArray('inline-radio', ['default', 'medium']),
  },
  args: {
    onHeaderRow: fn(),
    onChange: fn(),
    onRow: fn(),
    onSort: fn(),
    hideTitleBar: false,
    hideTitlePart: false,
    loading: false,
    roundedHeader: false,
    rowClassName: 'chromatic-ignore',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: fn(),
    },
    title: 'Table title',
    cellSize: 'default',
    showHeaderButton: false,
    rowKey: row => row.key,
  },
};
