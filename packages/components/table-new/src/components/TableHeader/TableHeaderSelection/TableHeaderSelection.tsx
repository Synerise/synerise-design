import React, { useCallback, useMemo } from 'react';

import {
  DropdownMenu,
  type DropdownMenuListItemProps,
} from '@synerise/ds-dropdown';
import Icon, { OptionVerticalM } from '@synerise/ds-icon';

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

  const totalSelectedCount = Object.keys(table.getState().rowSelection).length;
  const visibleRowCount = table.getRowModel().rows.length;
  const visibleSelectedCount = table.getFilteredSelectedRowModel().rows.length;

  // Checkbox reflects visible selection state
  const isAllVisibleSelected =
    visibleRowCount > 0 && visibleSelectedCount === visibleRowCount;
  // Indeterminate when some (but not all) visible items are selected
  const isAnySelected = visibleSelectedCount > 0 && !isAllVisibleSelected;

  const allRecordsCount = visibleRowCount;
  const selectedRecordsCount = totalSelectedCount;
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
    return isAllVisibleSelected ? texts.unselectAll : texts.selectAllTooltip;
  }, [
    hasGlobalSelection,
    isAllVisibleSelected,
    isGlobalAllSelected,
    texts.selectAllTooltip,
    texts.selectGlobalAll,
    texts.unselectAll,
    texts.unselectGlobalAll,
  ]);

  // Select all visible rows (additive — does not deselect filtered-out items)
  const selectAll = useCallback(() => {
    table.setRowSelection((prev) => {
      const next = { ...prev };
      table.getRowModel().rows.forEach((row) => {
        if (row.getCanSelect()) {
          next[row.id] = true;
        }
      });
      return next;
    });
  }, [table]);

  // Unselect only visible rows (does not deselect filtered-out items)
  const unselectAll = useCallback(() => {
    table.setRowSelection((prev) => {
      const next = { ...prev };
      table.getRowModel().rows.forEach((row) => {
        delete next[row.id];
      });
      return next;
    });
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
              if (!isAllVisibleSelected && !hasSelectionLimit) {
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
    isAllVisibleSelected,
    hasSelectionLimit,
    isAnySelected,
    selectAll,
    unselectAll,
    selectInvert,
  ]);

  const handleBatchSelectionChange = useCallback(() => {
    if (hasGlobalSelection) {
      isGlobalAllSelected ? unselectGlobalAll() : selectGlobalAll();
    } else {
      isAllVisibleSelected ? unselectAll() : selectAll();
    }
  }, [
    hasGlobalSelection,
    isAllVisibleSelected,
    isGlobalAllSelected,
    selectAll,
    selectGlobalAll,
    unselectAll,
    unselectGlobalAll,
  ]);

  return selectionConfig ? (
    <S.Selection data-popup-container>
      {!hasSelectionLimit && (
        <S.SelectionCheckbox
          isOrphan={!selectionConfig.selections}
          disabled={disabledBulkSelection}
          data-testid="ds-table-batch-selection-button"
          tooltipProps={{
            title: selectionTooltipTitle,
          }}
          checked={
            hasGlobalSelection ? isGlobalAllSelected : isAllVisibleSelected
          }
          indeterminate={isAnySelected}
          onChange={handleBatchSelectionChange}
        />
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
