import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { type TagTexts } from '../Tag.types';

export const useDefaultTexts = (texts?: Partial<TagTexts>): TagTexts => {
  const { formatMessage } = useIntl();
  const allTexts = useMemo(
    () => ({
      searchPlaceholder: formatMessage({
        id: 'DS.TAG.SEARCH-PLACEHOLDER',
        defaultMessage: 'Search',
      }),
      addButtonLabel: (
        <FormattedMessage
          id="DS.TAG.ADD-BUTTON-LABEL"
          defaultMessage="Add tag"
        />
      ),
      manageLinkLabel: (
        <FormattedMessage
          id="DS.TAG.MANAGE-LINK-LABEL"
          defaultMessage="Manage tags"
        />
      ),
      createTagButtonLabel: (
        <FormattedMessage
          id="DS.TAG.CREATE-TAG-LABEL"
          defaultMessage="Create tag"
        />
      ),
      dropdownNoTags: (
        <FormattedMessage id="DS.TAG.NO-TAGS" defaultMessage="No data" />
      ),
      clearTooltip: (
        <FormattedMessage id="DS.TAG.CLEAR-TOOLTIP" defaultMessage="Clear" />
      ),
      deleteTooltip: (
        <FormattedMessage id="DS.TAG.DELETE-TOOLTIP" defaultMessage="Delete" />
      ),
      noResultsLabel: (
        <FormattedMessage
          id="DS.TAG.NO-SEARCH-RESULTS"
          defaultMessage="No tags found"
        />
      ),
      ...(texts || {}),
    }),
    [texts, formatMessage],
  );
  return allTexts;
};
