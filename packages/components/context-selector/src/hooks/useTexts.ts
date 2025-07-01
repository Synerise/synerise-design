import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { ContextTexts } from '../ContextSelector.types';

export const useTexts = (
  defaultTexts?: Partial<ContextTexts>,
): ContextTexts => {
  const { formatMessage } = useIntl();
  const texts = useMemo(
    () => ({
      buttonLabel: formatMessage({
        id: 'DS.CONTEXT-SELECTOR.BUTTON_LABEL',
        defaultMessage: 'Choose',
      }),
      searchPlaceholder: formatMessage({
        id: 'DS.CONTEXT-SELECTOR.SEARCH_PLACEHOLDER',
        defaultMessage: 'Search',
      }),
      noResults: formatMessage({
        id: 'DS.CONTEXT-SELECTOR.NO_RESULTS',
        defaultMessage: 'No results',
      }),
      showMore: formatMessage({
        id: 'DS.CONTEXT-SELECTOR.SHOW_MORE',
        defaultMessage: 'Show more',
      }),
      recentItemsGroupName: formatMessage({
        id: 'DS.CONTEXT-SELECTOR.RECENT',
        defaultMessage: 'Recent',
      }),
      allItemsGroupName: formatMessage({
        id: 'DS.CONTEXT-SELECTOR.ALL',
        defaultMessage: 'All',
      }),

      ...defaultTexts,
    }),
    [defaultTexts, formatMessage],
  );

  return texts;
};
