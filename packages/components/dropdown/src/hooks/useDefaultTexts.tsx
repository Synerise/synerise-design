import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { type DropdownMenuTexts } from '../components/DropdownMenu/DropdownMenu.types';

export const useDefaultTexts = (
  customTexts?: Partial<DropdownMenuTexts>,
): DropdownMenuTexts => {
  const { formatMessage } = useIntl();
  return {
    noSearchResults: (
      <FormattedMessage
        id="DS.DROPDOWN-MENU.NO-SEARCH-RESULTS"
        defaultMessage="No results"
      />
    ),
    searchClearTooltip: (
      <FormattedMessage
        id="DS.CONFIRMATION.SEARCH-CLEAR-TOOLTIP"
        defaultMessage="Clear"
      />
    ),
    searchPlaceholder: formatMessage({
      id: 'DS.DROPDOWN-MENU.SEARCH-PLACEHOLDER',
      defaultMessage: 'Search',
    }),
    ...(customTexts || {}),
  };
};
