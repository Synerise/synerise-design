import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { MappingTexts } from '../Mapping.types';

export const useTexts = (defaultTexts?: Partial<MappingTexts>): MappingTexts => {
  const { formatMessage } = useIntl();
  const texts = useMemo(
    () => ({
      enableBatchSelection: formatMessage({
        id: 'DS.MAPPING.BULK_ACTIONS_ENABLE',
        defaultMessage: 'Bulk actions',
      }),
      disableBatchSelection: formatMessage({
        id: 'DS.MAPPING.BULK_ACTIONS_DISABLE',
        defaultMessage: 'Hide actions',
      }),
      ...defaultTexts,
    }),
    [defaultTexts, formatMessage]
  );

  return texts;
};
