import React from 'react';

import { Checkbox } from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';

import { type TableRowSelectionProps } from '../../../Table.types';
import { useSelectionContext } from '../../../contexts/SelectionContext';
import { useStickyContext } from '../../../contexts/StickyContext';
import { useTableContext } from '../../../contexts/TableContext';

export const TableRowSelection = <TData extends object>({
  texts,
  row,
}: TableRowSelectionProps<TData>) => {
  const stickyContext = useStickyContext();
  const { table } = useTableContext<TData>();
  const selection = useSelectionContext<TData>();
  const { globalSelectionOnChange, globalSelected, limit } = selection || {};

  const isGlobalAllSelected =
    globalSelectionOnChange !== undefined && globalSelected;

  const isSelected = row.getIsSelected();

  const isDisabled =
    !row.getCanSelect() ||
    isGlobalAllSelected ||
    (limit && table.getSelectedRowModel().rows.length >= limit && !isSelected);

  const toggleSelection = row.getToggleSelectedHandler();
  const handleChange = (newValue: boolean) => {
    stickyContext &&
      stickyContext.setStickyData((prevValue) => ({
        ...prevValue,
        isRevealed: true,
      }));
    toggleSelection(newValue);
  };

  const selectionTooltipProps = selection?.getSelectionTooltipProps?.(
    row.original,
  );

  return (
    <Tooltip title={texts.selectRowTooltip} {...(selectionTooltipProps || {})}>
      <Checkbox
        data-testid="ds-table-selection-button"
        checked={isGlobalAllSelected || isSelected}
        disabled={!!isDisabled}
        indeterminate={row.getIsSomeSelected()}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onChange={handleChange}
      />
    </Tooltip>
  );
};
