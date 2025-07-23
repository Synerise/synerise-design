import { type IntlShape } from 'react-intl';

const _DATA_FORMAT_NOTATION_TYPES = ['US', 'EU'] as const;
export type DataFormatNotationType =
  (typeof _DATA_FORMAT_NOTATION_TYPES)[number];

export type DataFormatConfig = {
  startWeekDayNotation?: DataFormatNotationType;
  dateFormatNotation?: DataFormatNotationType;
  timeFormatNotation?: DataFormatNotationType;
  numberFormatNotation?: DataFormatNotationType;
  applyTimeZoneOffset?: boolean;
};

export type DataFormatIntls = {
  numberFormatIntl: IntlShape;
  dateFormatIntl: IntlShape;
  timeFormatIntl: IntlShape;
};
