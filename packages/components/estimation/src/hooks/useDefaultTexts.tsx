import React from 'react';
import { FormattedMessage } from 'react-intl';

import { type EstimationTexts } from '../Estimation.types';

export const useDefaultTexts = (
  defaultTexts?: Partial<EstimationTexts>,
): EstimationTexts => {
  return {
    loading: (
      <FormattedMessage
        id="DS.ESTIMATION.LOADING"
        defaultMessage="Loading..."
      />
    ),

    calculated: (
      <FormattedMessage
        id="DS.ESTIMATION.CALCULATED"
        defaultMessage="Calculated:"
      />
    ),
    ...(defaultTexts || {}),
  };
};
