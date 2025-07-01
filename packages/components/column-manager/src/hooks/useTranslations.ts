import { useIntl } from 'react-intl';

import type { ColumnManagerTexts } from '../ColumnManager.types';

export const useTranslations = (
  texts?: Partial<ColumnManagerTexts>,
): ColumnManagerTexts => {
  const intl = useIntl();
  return {
    title: intl.formatMessage({
      id: 'DS.COLUMN-MANAGER.TITLE',
      defaultMessage: 'Manage columns',
    }),
    searchPlaceholder: intl.formatMessage({
      id: 'DS.COLUMN-MANAGER.SEARCH-PLACEHOLDER',
      defaultMessage: 'Search columns',
    }),
    searchClearTooltip: intl.formatMessage({
      id: 'DS.ITEM-FILTER.SEARCH-CLEAR',
      defaultMessage: 'Clear',
    }),
    noResults: intl.formatMessage({
      id: 'DS.COLUMN-MANAGER.NO-RESULTS',
      defaultMessage: 'No results',
    }),
    cancel: intl.formatMessage({
      id: 'DS.COLUMN-MANAGER.CANCEL',
      defaultMessage: 'Cancel',
    }),
    apply: intl.formatMessage({
      id: 'DS.COLUMN-MANAGER.APPLY',
      defaultMessage: 'Apply',
    }),
    clear: intl.formatMessage({
      id: 'DS.COLUMN-MANAGER.CLEAR',
      defaultMessage: 'Clear',
    }),
    switchOn: intl.formatMessage({
      id: 'DS.COLUMN-MANAGER.SWITCH-ON',
      defaultMessage: 'Hide column',
    }),
    switchOff: intl.formatMessage({
      id: 'DS.COLUMN-MANAGER.SWITCH-OFF',
      defaultMessage: 'Show column',
    }),
    ...(texts || {}),
  };
};
