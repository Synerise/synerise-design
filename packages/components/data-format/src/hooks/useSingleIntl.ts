import { createIntl, createIntlCache, IntlShape } from 'react-intl';

export const useSingleIntl = (locale: string): { intl: IntlShape } => {
  const cache = createIntlCache();
  const intl = createIntl({ locale }, cache);

  return { intl };
};
