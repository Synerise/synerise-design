import { IntlShape } from 'react-intl';

const DataFormatNotationTypes = ['US', 'EU'] as const;

export type DataFormatNotationType = typeof DataFormatNotationTypes[number];

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
