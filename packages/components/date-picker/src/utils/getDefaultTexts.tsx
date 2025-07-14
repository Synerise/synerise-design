import React from 'react';
import { FormattedMessage, type IntlShape } from 'react-intl';

import { type Texts } from '../DatePicker.types';

export const getDefaultTexts = (
  intl: IntlShape,
  texts?: Partial<Texts>,
): Texts => {
  const defaultTexts = {
    apply: (
      <FormattedMessage id="DS.DATE-PICKER.APPLY" defaultMessage="Apply" />
    ),
    now: <FormattedMessage id="DS.DATE-PICKER.NOW" defaultMessage="Now" />,
    quickPicks: (
      <FormattedMessage
        id="DS.DATE-PICKER.QUICK-PICKS"
        defaultMessage="Quick picks"
      />
    ),
    inputPlaceholder: intl.formatMessage({ id: 'DS.DATE-PICKER.SELECT-DATE' }),
    clearTooltip: (
      <FormattedMessage
        id="DS.DATE-PICKER.CLEAR-TOOLTIP"
        defaultMessage="Clear"
      />
    ),
  };
  return texts
    ? {
        ...defaultTexts,
        ...texts,
      }
    : defaultTexts;
};
