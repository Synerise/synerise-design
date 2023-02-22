import * as React from 'react';
import { Moment } from 'moment';
import { Dayjs } from 'dayjs';

import { useDataFormat } from '../hooks';
import { ValueToFormatOptions } from '../types';

export type FormattedTimeProps = {
  value: Date | Moment | Dayjs;
  options?: ValueToFormatOptions;
};

export const FormattedTime: React.FC<FormattedTimeProps> = ({ value, options }) => {
  const { formattedValue } = useDataFormat();

  return <span>{formattedValue(value, { ...options, targetFormat: 'time' })}</span>;
};
