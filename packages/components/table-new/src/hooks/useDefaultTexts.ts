import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { type TableTexts } from '../Table.types';

export const useDefaultTexts = (
  defaultTexts?: Partial<TableTexts>,
): TableTexts => {
  const intl = useIntl();
  return useMemo(
    () => ({
      infiniteScrollLoading: intl.formatMessage({
        id: 'DS.TABLE.INFINITE_SCROLL.LOADING',
        defaultMessage: 'Loading',
      }),
      infiniteScrollError: intl.formatMessage({
        id: 'DS.TABLE.INFINITE_SCROLL.ERROR',
        defaultMessage: 'An error occurred',
      }),
      infiniteScrollRetry: intl.formatMessage({
        id: 'DS.TABLE.INFINITE_SCROLL.RETRY',
        defaultMessage: 'Retry',
      }),
      infiniteScrollNoMoreData: intl.formatMessage({
        id: 'DS.TABLE.INFINITE_SCROLL.NO_MORE_DATA',
        defaultMessage: 'There are no more items to load',
      }),
      infiniteScrollBackToTop: intl.formatMessage({
        id: 'DS.TABLE.INFINITE_SCROLL.BACK_TO_TOP',
        defaultMessage: 'Back to top',
      }),
      columnSortClear: intl.formatMessage({
        id: 'DS.TABLE.COLUMN.SORT_CLEAR',
        defaultMessage: 'Clear',
      }),
      columnSortAscend: intl.formatMessage({
        id: 'DS.TABLE.COLUMN.SORT_ASCEND',
        defaultMessage: 'Sort ascending',
      }),
      columnSortDescend: intl.formatMessage({
        id: 'DS.TABLE.COLUMN.SORT_DESCEND',
        defaultMessage: 'Sort descending',
      }),
      columnSortZa: intl.formatMessage({
        id: 'DS.TABLE.COLUMN.SORT_ZA',
        defaultMessage: 'Sort z-a',
      }),
      columnSortAz: intl.formatMessage({
        id: 'DS.TABLE.COLUMN.SORT_AZ',
        defaultMessage: 'Sort a-z',
      }),
      totalItems: intl.formatMessage({
        id: 'DS.TABLE.ITEMS',
        defaultMessage: 'Records',
      }),
      selected: intl.formatMessage({
        id: 'DS.TABLE.SELECTED',
        defaultMessage: 'selected',
      }),
      selectAll: intl.formatMessage({
        id: 'DS.TABLE.SELECT_ALL',
        defaultMessage: 'Select visible',
      }),
      selectAllTooltip: intl.formatMessage({
        id: 'DS.TABLE.SELECT_ALL_BUTTON_TOOLTIP',
        defaultMessage: 'Select all',
      }),
      selectGlobalAll: intl.formatMessage({
        id: 'DS.TABLE.SELECT_GLOBAL_ALL',
        defaultMessage: 'Select all',
      }),
      selectInvert: intl.formatMessage({
        id: 'DS.TABLE.SELECT_INVERT',
        defaultMessage: 'Invert selection',
      }),
      selectionLimitWarning: intl.formatMessage({
        id: 'DS.TABLE.SELECTION_LIMIT',
        defaultMessage: 'You have reached max limit',
      }),
      selectionOptionsTooltip: intl.formatMessage({
        id: 'DS.TABLE.SELECTIONS_MENU_TOOLTIP',
        defaultMessage: 'Batch selection options',
      }),
      unselectAll: intl.formatMessage({
        id: 'DS.TABLE.UNSELECT_ALL',
        defaultMessage: 'Unselect visible',
      }),
      unselectGlobalAll: intl.formatMessage({
        id: 'DS.TABLE.UNSELECT_GLOBAL_ALL',
        defaultMessage: 'Unselect all',
      }),
      emptyText: intl.formatMessage({
        id: 'DS.TABLE.NO_DATA',
        defaultMessage: 'No data',
      }),
      selectRowTooltip: intl.formatMessage({
        id: 'DS.TABLE.SELECT_ROW_TOOLTIP',
        defaultMessage: 'Select',
      }),
      ...defaultTexts,
    }),
    [intl, defaultTexts],
  );
};
