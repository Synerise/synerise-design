import * as React from 'react';
import { Moment } from 'moment';
import { Dayjs } from 'dayjs';

import { useDataFormat } from '../hooks';
import { ValueToFormatOptions } from '../types';

export type FormattedDateProps = {
  value: Date | Moment | Dayjs;
  options?: ValueToFormatOptions;
};

export const FormattedDate: React.FC<FormattedDateProps> = ({ value, options }) => {
  const { formattedValue } = useDataFormat();

  return <span>{formattedValue(value, options)}</span>;
};
