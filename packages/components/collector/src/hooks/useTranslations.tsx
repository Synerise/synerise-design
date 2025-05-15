import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import type { CollectorTexts } from '../Collector.types';

export const useTranslations = (texts?: Partial<CollectorTexts>): CollectorTexts => {
  const intl = useIntl();
  return {
    add: <FormattedMessage id="DS.COLLECTOR.ADD" defaultMessage="Add" />,
    cancel: <FormattedMessage id="DS.COLLECTOR.CANCEL" defaultMessage="Cancel" />,
    placeholder: intl.formatMessage({ id: 'DS.COLLECTOR.PLACEHOLDER', defaultMessage: 'Type value' }),
    toNavigate: <FormattedMessage id="DS.COLLECTOR.TO-NAVIGATE" defaultMessage="to navigate" />,
    toSelect: <FormattedMessage id="DS.COLLECTOR.TO-SELECT" defaultMessage="to select" />,
    ...(texts || {}),
  };
};
