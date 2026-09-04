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
  const { globalSelected, globalSelectionOnChange, limit } =
    selectionConfig || {};

  const selectionLimit =
    typeof limit === 'number' && limit > 0 ? limit : undefined;
  const hasSelectionLimit = selectionLimit !== undefined;

  const hasGlobalSelection = globalSelectionOnChange !== undefined;
  const isGlobalAllSelected = hasGlobalSelection && globalSelected;

  const totalSelectedCount = Object.keys(table.getState().rowSelection).length;
  const visibleRowCount = table.getRowModel().rows.length;
  const visibleSelectedCount = table.getFilteredSelectedRowModel().rows.length;

  const allRecordsCount = visibleRowCount;
  const selectableRecordsCount = table
    .getRowModel()
    .rows.filter((row) => row.getCanSelect()).length;

  // Checkbox reflects visible selection state — ignore rows that can't be selected
  // (disabled/unavailable via checkRowSelectionStatus) so "all selected" is reachable.
  const isAllVisibleSelected =
    selectableRecordsCount > 0 &&
    visibleSelectedCount === selectableRecordsCount;
  // Indeterminate when some (but not all) selectable items are selected
  const isAnySelected = visibleSelectedCount > 0 && !isAllVisibleSelected;

  // At the cap the checkbox reads checked, not indeterminate — row checkboxes are disabled then,
  // so the header is the only way back out of the selection.
  const isLimitReached =
    selectionLimit !== undefined && totalSelectedCount >= selectionLimit;
  const isHeaderChecked = hasGlobalSelection
    ? Boolean(isGlobalAllSelected)
    : isAllVisibleSelected || isLimitReached;

  const disabledBulkSelection = Boolean(
    allRecordsCount === 0 || selectableRecordsCount === 0,
  );

  const selectionTooltipTitle = useMemo(() => {
    if (hasGlobalSelection) {
      return isGlobalAllSelected
        ? texts.unselectGlobalAll
        : texts.selectGlobalAll;
    }
    return isHeaderChecked ? texts.unselectAllTooltip : texts.selectAllTooltip;
  }, [
    hasGlobalSelection,
    isHeaderChecked,
    isGlobalAllSelected,
    texts.selectAllTooltip,
    texts.selectGlobalAll,
    texts.unselectAllTooltip,
    texts.unselectGlobalAll,
  ]);

  // Select all visible rows (additive — does not deselect filtered-out items). Under a limit,
  // already-selected keys (including filtered-out ones) count against the cap.
  const selectAll = useCallback(() => {
    table.setRowSelection((prev) => {
      const next = { ...prev };
      let selectedCount = Object.keys(next).length;
      for (const row of table.getRowModel().rows) {
        if (selectionLimit !== undefined && selectedCount >= selectionLimit) {
          break;
        }
        if (row.getCanSelect() && !next[row.id]) {
          next[row.id] = true;
          selectedCount += 1;
        }
      }
      return next;
    });
  }, [table, selectionLimit]);

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

  // The header checkbox mirrors the *global* selected count — so does the header counter, and so
  // does the cap — which means unchecking it has to release the whole selection, not just the rows
  // that happen to be on screen. The dropdown's "unselect visible" stays visible-scoped.
  const clearSelection = useCallback(() => {
    table.setRowSelection({});
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
              if (!isAllVisibleSelected && !isLimitReached) {
                items.push({
                  onClick: selectAll,
                  text: texts.selectAll,
                });
              }
              if (visibleSelectedCount > 0) {
                items.push({
                  onClick: unselectAll,
                  text: texts.unselectAll,
                });
              }
              return items;
            }
            case SELECTION_INVERT: {
              // Never offered under a limit — a truncated inversion would misrepresent the selection.
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
    isLimitReached,
    visibleSelectedCount,
    selectAll,
    unselectAll,
    selectInvert,
  ]);

  const handleBatchSelectionChange = useCallback(() => {
    if (hasGlobalSelection) {
      isGlobalAllSelected ? unselectGlobalAll() : selectGlobalAll();
    } else {
      isHeaderChecked ? clearSelection() : selectAll();
    }
  }, [
    hasGlobalSelection,
    isHeaderChecked,
    isGlobalAllSelected,
    clearSelection,
    selectAll,
    selectGlobalAll,
    unselectGlobalAll,
  ]);

  return selectionConfig ? (
    <S.Selection data-popup-container>
      <S.SelectionCheckbox
        $isOrphan={!selectionConfig.selections}
        disabled={disabledBulkSelection}
        data-testid="ds-table-batch-selection-button"
        tooltipProps={{
          title: selectionTooltipTitle,
        }}
        checked={isHeaderChecked}
        indeterminate={isAnySelected && !isHeaderChecked}
        onChange={handleBatchSelectionChange}
      />
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
