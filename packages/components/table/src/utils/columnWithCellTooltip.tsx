import React from 'react';

import Tooltip from '@synerise/ds-tooltip';

import { type DSColumnType } from '../Table.types';
import { EXPANDED_ROW_PROPERTY } from '../VirtualTable/constants';
import { getValueFromPath } from './getValueFromPath';

export const columnWithCellTooltip = <T extends object>(
  column: DSColumnType<T>,
): DSColumnType<T> => {
  if (!column.getCellTooltipProps) {
    return column;
  }
  const renderColumn = (value: unknown, rowData: T, columnIndex: number) => {
    const cellTooltip = column.getCellTooltipProps?.(rowData);
    if (rowData[EXPANDED_ROW_PROPERTY as keyof T] && column.childRender) {
      const content = column.childRender(
        getValueFromPath(rowData, column.dataIndex),
        rowData,
        columnIndex,
      );
      return cellTooltip ? (
        <Tooltip {...cellTooltip}>{content}</Tooltip>
      ) : (
        content
      );
    }
    const content = column.render
      ? column.render(
          getValueFromPath(rowData, column.dataIndex),
          rowData,
          columnIndex,
        )
      : getValueFromPath(rowData, column.dataIndex);
    return cellTooltip ? (
      <Tooltip {...cellTooltip}>
        <>{content}</>
      </Tooltip>
    ) : (
      <>{content}</>
    );
  };

  return { ...column, render: renderColumn };
};
