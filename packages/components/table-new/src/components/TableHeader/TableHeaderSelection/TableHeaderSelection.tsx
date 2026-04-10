import React, { useCallback, useMemo } from 'react';

import {
  DropdownMenu,
  type DropdownMenuListItemProps,
} from '@synerise/ds-dropdown';
import Icon, { OptionVerticalM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { SELECTION_ALL, SELECTION_INVERT } from '../../../Table.const';
import {
  type Selection,
  type SelectionItem,
  type TableHeaderSelectionProps,
} from '../../../Table.types';
import { useSelectionContext } from '../../../contexts/SelectionContext';
import { useTableContext } from '../../../contexts/TableContext';
import * as S from './TableHeaderSelection.styles';

export const TableHeaderSelection = <TData extends object>({
  texts,
}: TableHeaderSelectionProps) => {
  const { table } = useTableContext<TData>();

  const selectionConfig = useSelectionContext<TData>();
  const {
    globalSelected,
    globalSelectionOnChange,
    limit: hasSelectionLimit,
  } = selectionConfig || {};

  const hasGlobalSelection = globalSelectionOnChange !== undefined;
  const isGlobalAllSelected = hasGlobalSelection && globalSelected;

  const isAllSelected = table.getIsAllRowsSelected();
  const isAnySelected = table.getIsSomeRowsSelected();

  const allRecordsCount = table.getRowModel().rows.length;
  const selectedRecordsCount = table.getFilteredSelectedRowModel().rows.length;
  const selectableRecordsCount = table
    .getRowModel()
    .rows.filter((row) => row.getCanSelect()).length;

  const disabledBulkSelection = Boolean(
    allRecordsCount === 0 ||
    selectableRecordsCount === 0 ||
    (hasSelectionLimit && selectedRecordsCount === 0),
  );

  const selectionTooltipTitle = useMemo(() => {
    if (hasGlobalSelection) {
      return isGlobalAllSelected
        ? texts.unselectGlobalAll
        : texts.selectGlobalAll;
    }
    return isAllSelected ? texts.unselectAll : texts.selectAllTooltip;
  }, [
    hasGlobalSelection,
    isAllSelected,
    isGlobalAllSelected,
    texts.selectAllTooltip,
    texts.selectGlobalAll,
    texts.unselectAll,
    texts.unselectGlobalAll,
  ]);

  const selectAll = useCallback(() => {
    table.toggleAllRowsSelected(true);
  }, [table]);

  const unselectAll = useCallback(() => {
    table.toggleAllRowsSelected(false);
  }, [table]);

  const selectGlobalAll = useCallback(() => {
    unselectAll();
    globalSelectionOnChange?.(true);
  }, [unselectAll, globalSelectionOnChange]);

  const unselectGlobalAll = useCallback(() => {
    unselectAll();
    globalSelectionOnChange?.(false);
  }, [unselectAll, globalSelectionOnChange]);

  const selectInvert = useCallback(() => {
    table.setRowSelection((selectionState) => {
      const inverted: Record<string, boolean> = {};
      Object.keys(table.getRowModel().rowsById).forEach((id) => {
        if (!selectionState[id]) {
          inverted[id] = true;
        }
      });
      return inverted;
    });
  }, [table]);

  const dropdownDataSource = useMemo(() => {
    const globalSelectionItem = hasGlobalSelection
      ? [
          isGlobalAllSelected
            ? {
                onClick: unselectGlobalAll,
                text: texts.unselectGlobalAll,
              }
            : {
                onClick: selectGlobalAll,
                text: texts.selectGlobalAll,
              },
        ]
      : [];

    const menuItems = selectionConfig?.selections
      ?.filter(Boolean)
      .flatMap(
        (
          selectionMenuElement: Selection | SelectionItem,
        ): DropdownMenuListItemProps | DropdownMenuListItemProps[] => {
          switch (selectionMenuElement) {
            case SELECTION_ALL: {
              const items: DropdownMenuListItemProps[] = [];
              if (!isAllSelected && !hasSelectionLimit) {
                items.push({
                  onClick: selectAll,
                  text: texts.selectAll,
                });
              }
              if (isAnySelected) {
                items.push({
                  onClick: unselectAll,
                  text: texts.unselectAll,
                });
              }
              return items;
            }
            case SELECTION_INVERT: {
              return !hasSelectionLimit
                ? { onClick: selectInvert, text: texts.selectInvert }
                : [];
            }
            default: {
              const sel = selectionMenuElement as Selection;
              return { ...sel, text: sel.label };
            }
          }
        },
      );
    return [...globalSelectionItem, ...(menuItems || [])];
  }, [
    hasGlobalSelection,
    isGlobalAllSelected,
    unselectGlobalAll,
    texts.unselectGlobalAll,
    texts.selectGlobalAll,
    texts.selectAll,
    texts.unselectAll,
    texts.selectInvert,
    selectGlobalAll,
    selectionConfig?.selections,
    isAllSelected,
    hasSelectionLimit,
    isAnySelected,
    selectAll,
    unselectAll,
    selectInvert,
  ]);

  const handleBatchSelectionChange = useCallback(() => {
    const isSelected = hasGlobalSelection
      ? isGlobalAllSelected
      : table.getIsAllRowsSelected();

    if (hasGlobalSelection) {
      isSelected ? unselectGlobalAll() : selectGlobalAll();
    } else {
      table.toggleAllRowsSelected(!isSelected);
    }
  }, [
    hasGlobalSelection,
    isGlobalAllSelected,
    selectGlobalAll,
    table,
    unselectGlobalAll,
  ]);

  return selectionConfig ? (
    <S.Selection data-popup-container>
      {!hasSelectionLimit && (
        <Tooltip title={selectionTooltipTitle}>
          <S.SelectionCheckbox
            isOrphan={!selectionConfig.selections}
            disabled={disabledBulkSelection}
            data-testid="ds-table-batch-selection-button"
            checked={
              hasGlobalSelection
                ? isGlobalAllSelected
                : table.getIsAllRowsSelected()
            }
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={handleBatchSelectionChange}
          />
        </Tooltip>
      )}
      {selectionConfig.selections && (
        <DropdownMenu
          disabled={disabledBulkSelection || dropdownDataSource?.length === 0}
          getPopupContainer={() => document.body}
          dataSource={dropdownDataSource || []}
          popoverProps={{
            testId: 'table-selection',
          }}
          asChild
        >
          <S.DropdownButton
            isOrphan={!!hasSelectionLimit}
            disabled={disabledBulkSelection || dropdownDataSource?.length === 0}
            mode="single-icon"
            type="ghost"
            data-testid="ds-table-batch-selection-options"
            tooltipProps={{
              title: texts.selectionOptionsTooltip,
            }}
          >
            <Icon component={<OptionVerticalM />} />
          </S.DropdownButton>
        </DropdownMenu>
      )}
    </S.Selection>
  ) : null;
};
