import { type Dayjs } from 'dayjs';
import React from 'react';

import { DATETIME } from '../constants';
import { useDataFormat } from '../hooks';
import { type DateToFormatOptions, type MomentLike } from '../types';

export type FormattedTimeProps = {
  value: Date | MomentLike | Dayjs;
  options?: DateToFormatOptions;
};

export const FormattedDateTime: React.FC<FormattedTimeProps> = ({
  value,
  options,
}): JSX.Element => {
  const { formatValue } = useDataFormat();

  return <>{formatValue(value, { ...options, targetFormat: DATETIME })}</>;
};
