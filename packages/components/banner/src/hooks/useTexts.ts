import { useIntl } from 'react-intl';

import { type BannerTexts } from '../Banner.types';

export const useTexts = (texts?: Partial<BannerTexts>): BannerTexts => {
  const intl = useIntl();

  return {
    expand: intl.formatMessage({
      id: 'DS.BANNER.EXPAND',
      defaultMessage: 'Expand',
    }),
    collapse: intl.formatMessage({
      id: 'DS.BANNER.COLLAPSE',
      defaultMessage: 'Collapse',
    }),
    closeTooltip: intl.formatMessage({
      id: 'DS.BANNER.CLOSE-TOOLTIP',
      defaultMessage: 'Close',
    }),
    ...(texts || {}),
  };
};
