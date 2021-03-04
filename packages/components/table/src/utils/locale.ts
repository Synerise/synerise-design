import * as React from 'react';
import { IntlShape } from 'react-intl';
import { Locale } from '../Table.types';

export const getDefaultLocale = (intl: IntlShape): Locale => ({
  pagination: {
    items: intl.formatMessage({ id: 'DS.TABLE.PAGINATION.ITEMS', defaultMessage: 'results' }),
    groups: intl.formatMessage({ id: 'DS.TABLE.PAGINATION.GROUPS', defaultMessage: 'groups' }),
  },
  selected: intl.formatMessage({ id: 'DS.TABLE.SELECTED', defaultMessage: 'selected' }),
  emptyText: intl.formatMessage({ id: 'DS.TABLE.EMPTY_TEXT', defaultMessage: 'No data' }),
  selectionLimitWarning: intl.formatMessage({
    id: 'DS.TABLE.SELECTION_LIMIT_WARNING',
    defaultMessage: 'Selection limit has been reached',
  }),
  starRowTooltip: intl.formatMessage({ id: 'DS.TABLE.STAR_ROW_TOOLTIP', defaultMessage: 'Starred' }),
  selectRowTooltip: intl.formatMessage({ id: 'DS.TABLE.SELECT_ROW_TOOLTIP', defaultMessage: 'Select' }),
  selectAllTooltip: intl.formatMessage({ id: 'DS.TABLE.SELECT_ALL_TOOLTIP', defaultMessage: 'Select' }),
  selectionOptionsTooltip: intl.formatMessage({ id: 'DS.TABLE.SELECTION_OPTIONS', defaultMessage: 'Options' }),
});

export const useTableLocale = (intl: IntlShape, locale?: Locale): Locale =>
  React.useMemo((): Locale => {
    return {
      ...getDefaultLocale(intl),
      ...locale,
      pagination: { ...getDefaultLocale(intl).pagination, ...locale?.pagination },
    };
  }, [intl, locale]);
