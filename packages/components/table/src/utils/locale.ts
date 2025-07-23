import { createContext, useContext, useMemo } from 'react';
import { type IntlShape } from 'react-intl';

import { type Locale } from '../Table.types';

export const getDefaultLocale = (intl: IntlShape): Locale => ({
  pagination: {
    items: intl.formatMessage({
      id: 'DS.TABLE.PAGINATION.ITEMS',
      defaultMessage: 'results',
    }),
    groups: intl.formatMessage({
      id: 'DS.TABLE.PAGINATION.GROUPS',
      defaultMessage: 'groups',
    }),
  },
  selected: intl.formatMessage({
    id: 'DS.TABLE.SELECTED',
    defaultMessage: 'selected',
  }),
  emptyText: intl.formatMessage({
    id: 'DS.TABLE.EMPTY_TEXT',
    defaultMessage: 'No data',
  }),
  selectionLimitWarning: intl.formatMessage({
    id: 'DS.TABLE.SELECTION_LIMIT_WARNING',
    defaultMessage: 'Selection limit has been reached',
  }),
  starRowTooltip: intl.formatMessage({
    id: 'DS.TABLE.STAR_ROW_TOOLTIP',
    defaultMessage: 'Starred',
  }),
  selectRowTooltip: intl.formatMessage({
    id: 'DS.TABLE.SELECT_ROW_TOOLTIP',
    defaultMessage: 'Select',
  }),
  selectAllTooltip: intl.formatMessage({
    id: 'DS.TABLE.SELECT_ALL_TOOLTIP',
    defaultMessage: 'Select',
  }),
  selectionOptionsTooltip: intl.formatMessage({
    id: 'DS.TABLE.SELECTION_OPTIONS',
    defaultMessage: 'Options',
  }),
  columnSortAz: intl.formatMessage({
    id: 'DS.TABLE.COLUMN.SORT_AZ',
    defaultMessage: 'Sort a-z',
  }),
  columnSortZa: intl.formatMessage({
    id: 'DS.TABLE.COLUMN.SORT_ZA',
    defaultMessage: 'Sort z-a',
  }),
  columnSortAscend: intl.formatMessage({
    id: 'DS.TABLE.COLUMN.SORT_ASCEND',
    defaultMessage: 'Sort ascending',
  }),
  columnSortDescend: intl.formatMessage({
    id: 'DS.TABLE.COLUMN.SORT_DESCEND',
    defaultMessage: 'Sort descending',
  }),
  columnSortClear: intl.formatMessage({
    id: 'DS.TABLE.COLUMN.SORT_CLEAR',
    defaultMessage: 'Clear',
  }),
  infiniteScrollError: intl.formatMessage({
    id: 'DS.TABLE.INFINITE_SCROLL.ERROR',
    defaultMessage: 'Cannot load more items',
  }),
  infiniteScrollRetry: intl.formatMessage({
    id: 'DS.TABLE.INFINITE_SCROLL.RETRY',
    defaultMessage: 'Retry',
  }),
  infiniteScrollNoMoreData: intl.formatMessage({
    id: 'DS.TABLE.INFINITE_SCROLL.NO_MORE_DATA',
    defaultMessage: 'There are no more items to load',
  }),
  infiniteScrollLoading: intl.formatMessage({
    id: 'DS.TABLE.INFINITE_SCROLL.LOADING',
    defaultMessage: 'Loading more items',
  }),
  infiniteScrollBackToTop: intl.formatMessage({
    id: 'DS.TABLE.INFINITE_SCROLL.BACK_TO_TOP',
    defaultMessage: 'Back to top',
  }),
  unselectAll: intl.formatMessage({
    id: 'DS.TABLE.UNSELECT_ALL',
    defaultMessage: 'Unselect visible',
  }),
  selectAll: intl.formatMessage({
    id: 'DS.TABLE.SELECT_ALL',
    defaultMessage: 'Select visible',
  }),
  unselectGlobalAll: intl.formatMessage({
    id: 'DS.TABLE.UNSELECT_GLOBAL_ALL',
    defaultMessage: 'Unselect all',
  }),
  selectGlobalAll: intl.formatMessage({
    id: 'DS.TABLE.SELECT_GLOBAL_ALL',
    defaultMessage: 'Select all',
  }),
  selectInvert: intl.formatMessage({
    id: 'DS.TABLE.SELECT_INVERT',
    defaultMessage: 'Invert selection',
  }),
});

export const useTableLocale = (intl: IntlShape, locale?: Locale): Locale =>
  useMemo((): Locale => {
    return {
      ...getDefaultLocale(intl),
      ...locale,
      pagination: {
        ...getDefaultLocale(intl).pagination,
        ...locale?.pagination,
      },
    };
  }, [intl, locale]);

export const TableLocaleContext = createContext<Locale>({});

export const useTableLocaleContext = () => useContext(TableLocaleContext);
