import {
  type IntlShape,
  createIntl,
  createIntlCache,
  useIntl,
} from 'react-intl';

export const useSingleIntl = (locale: string): { intl: IntlShape } => {
  const cache = createIntlCache();
  const globalIntl = useIntl();
  const intl = createIntl({ locale, timeZone: globalIntl.timeZone }, cache);

  return { intl };
};
