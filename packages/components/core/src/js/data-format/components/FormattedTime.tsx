import { type Dayjs } from 'dayjs';
import { type Moment } from 'moment';
import React from 'react';

import { TIME } from '../constants';
import { useDataFormat } from '../hooks';
import { type DateToFormatOptions } from '../types';

export type FormattedTimeProps = {
  value: Date | Moment | Dayjs;
  options?: DateToFormatOptions;
};

export const FormattedTime: React.FC<FormattedTimeProps> = ({
  value,
  options,
}): JSX.Element => {
  const { formatValue } = useDataFormat();

  return <>{formatValue(value, { ...options, targetFormat: TIME })}</>;
};
