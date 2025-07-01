import React from 'react';
import { FormattedMessage } from 'react-intl';

import { type ConfirmationTexts } from '../Confirmation.types';

export const useDefaultTexts = (
  defaultTexts?: Partial<ConfirmationTexts>,
): ConfirmationTexts => {
  return {
    mainButtonLabel: (
      <FormattedMessage
        id="DS.CONFIRMATION.MAIN-BUTTON-LABEL"
        defaultMessage="Ok"
      />
    ),
    secondaryButtonLabel: (
      <FormattedMessage
        id="DS.CONFIRMATION.SECONDARY-BUTTON-LABEL"
        defaultMessage="Cancel"
      />
    ),
    relatedObjectsButtonLabel: (
      <FormattedMessage
        id="DS.CONFIRMATION.RELATED-OBJECT-BUTTON-LABEL"
        defaultMessage="Show related objects"
      />
    ),
    batchActionItemsTitle: (
      <FormattedMessage
        id="DS.CONFIRMATION.BATCH-ACTIONS-ITEMS-TITLE"
        defaultMessage="Objects to delete"
      />
    ),
    decisionTitle: (
      <FormattedMessage
        id="DS.CONFIRMATION.DECISION-TITLE"
        defaultMessage="What do you want to do?"
      />
    ),
    relatedObjectsTitle: (
      <FormattedMessage
        id="DS.CONFIRMATION.RELATED-OBJECTS-TITLE"
        defaultMessage="Related objects"
      />
    ),
    ...(defaultTexts || {}),
  };
};
