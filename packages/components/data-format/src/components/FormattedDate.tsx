import * as React from 'react';
import { Moment } from 'moment';
import { Dayjs } from 'dayjs';

import { useDataFormat } from '../hooks';
import { DateToFormatOptions } from '../types';

export type FormattedDateProps = {
  value: Date | Moment | Dayjs;
  options?: DateToFormatOptions;
};

export const FormattedDate: React.FC<FormattedDateProps> = ({ value, options }): JSX.Element => {
  const { formatValue } = useDataFormat();

  return <>{formatValue(value, options)}</>;
};
