import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ShortCuts from '@synerise/ds-short-cuts';

import { ItemPickerTexts } from '../components/ItemPickerNew/ItemPickerNew.types';

export const useDefaultTexts = (texts?: Partial<ItemPickerTexts>): ItemPickerTexts => {
  const intl = useIntl();
  const allTexts = useMemo(
    () => ({
      searchPlaceholder: (
        <FormattedMessage
          values={{
            shortCutKey: (
              <ShortCuts color="light" size="L">
                /
              </ShortCuts>
            ),
          }}
          id="DS.ITEM-PICKER-DROPDOWN.SEARCH-PLACEHOLDER"
          defaultMessage="Search for object or type {shortCutKey} to show actions"
        />
      ),
      yes: intl.formatMessage({ id: 'DS.ITEM-PICKER.YES-TEXT', defaultMessage: 'Yes' }),
      no: intl.formatMessage({ id: 'DS.ITEM-PICKER.NO-TEXT', defaultMessage: 'No' }),
      clear: intl.formatMessage({ id: 'DS.ITEM-PICKER.CLEAR', defaultMessage: 'Clear' }),
      clearConfirmTitle: intl.formatMessage({ id: 'DS.ITEM-PICKER.CLEAR-CONFIRM', defaultMessage: 'Please confirm' }),
      changeButtonLabel: intl.formatMessage({ id: 'DS.ITEM-PICKER.CHANGE-BUTTON', defaultMessage: 'Change' }),
      refreshButtonLabel: intl.formatMessage({ id: 'DS.ITEM-PICKER.REFRESH', defaultMessage: 'Refresh' }),
      noItems: intl.formatMessage({ id: 'DS.ITEM-PICKER-DROPDOWN.NO-ITEMS', defaultMessage: 'No items' }),
      noResults: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.NO-SEARCH-RESULTS',
        defaultMessage: 'No results found',
      }),
      noActions: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.NO-ACTIONS',
        defaultMessage: 'No actions available',
      }),
      noResultsInSection: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.NO-SEARCH-RESULTS-FOLDER',
        defaultMessage: 'Please check your phrase or try searching in different folders.',
      }),
      searchAllFoldersButtonLabel: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.SEARCH-EVERYWHERE',
        defaultMessage: 'Search all folders',
      }),
      recentsSectionLabel: intl.formatMessage({ id: 'DS.ITEM-PICKER-DROPDOWN.RECENTS', defaultMessage: 'Recent' }),
      actionsSectionLabel: intl.formatMessage({ id: 'DS.ITEM-PICKER-DROPDOWN.ACTIONS', defaultMessage: 'Actions' }),
      resultsSectionLabel: intl.formatMessage({ id: 'DS.ITEM-PICKER-DROPDOWN.RESULTS', defaultMessage: 'Results' }),
      itemsSectionLabel: intl.formatMessage({ id: 'DS.ITEM-PICKER-DROPDOWN.ITEMS', defaultMessage: 'Items' }),
      infiniteScrollLoadingMore: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.LOADING-MORE',
        defaultMessage: 'Loading more items...',
      }),
      infiniteScrollLoadingError: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.LOADING-ERROR',
        defaultMessage: 'Loading error',
      }),
      infiniteScrollAllLoaded: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.LOADED-ALL',
        defaultMessage: 'All items loaded',
      }),
      errorMessageTitle: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.ERROR-TITLE',
        defaultMessage: 'Items can`t be loaded',
      }),
      errorMessageDetails: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.ERROR-DESCRIPTION',
        defaultMessage: 'Try refreshing the list later',
      }),
      showMoreResultsLabel: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.SHOW-MORE',
        defaultMessage: 'Show more',
      }),
      backTooltip: intl.formatMessage({ id: 'DS.ITEM-PICKER-DROPDOWN.BACK-TOOLTIP', defaultMessage: 'Back' }),
      clearSearchTooltip: intl.formatMessage({
        id: 'DS.ITEM-PICKER-DROPDOWN.CLEAR-SEARCH-TOOLTIP',
        defaultMessage: 'Clear',
      }),

      ...(texts || {}),
    }),
    [intl, texts]
  );
  return allTexts;
};
