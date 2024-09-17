import React from 'react';
import { Moment } from 'moment';
import { Dayjs } from 'dayjs';

import { useDataFormat } from '../hooks';
import { DateToFormatOptions } from '../types';
import { TIME } from '../constants';

export type FormattedTimeProps = {
  value: Date | Moment | Dayjs;
  options?: DateToFormatOptions;
};

export const FormattedTime: React.FC<FormattedTimeProps> = ({ value, options }): JSX.Element => {
  const { formatValue } = useDataFormat();

  return <>{formatValue(value, { ...options, targetFormat: TIME })}</>;
};
