import { IntlShape } from 'react-intl';

const DATA_FORMAT_NOTATION_TYPES = ['US', 'EU'] as const;
export type DataFormatNotationType = typeof DATA_FORMAT_NOTATION_TYPES[number];

export type DataFormatConfig = {
  startWeekDayNotation?: DataFormatNotationType;
  dateFormatNotation?: DataFormatNotationType;
  timeFormatNotation?: DataFormatNotationType;
  numberFormatNotation?: DataFormatNotationType;
};

export type DataFormatIntls = {
  numberFormatIntl: IntlShape;
  dateFormatIntl: IntlShape;
  timeFormatIntl: IntlShape;
};
