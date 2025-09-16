import { type Dayjs } from 'dayjs';
import { type Moment } from 'moment';
import React from 'react';

import { useDataFormat } from '../hooks';
import { type DateToFormatOptions } from '../types';

export type FormattedDateProps = {
  value: Date | Moment | Dayjs;
  options?: DateToFormatOptions;
};

export const FormattedDate: React.FC<FormattedDateProps> = ({
  value,
  options,
}): JSX.Element => {
  const { formatValue } = useDataFormat();

  return <>{formatValue(value, options)}</>;
};
