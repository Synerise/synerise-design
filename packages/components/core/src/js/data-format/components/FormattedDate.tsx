import type { Dayjs } from 'dayjs';
import React from 'react';

import { useDataFormat } from '../hooks';
import type { DateToFormatOptions, MomentLike } from '../types';

export type FormattedDateProps = {
  value: Date | MomentLike | Dayjs;
  options?: DateToFormatOptions;
};

export const FormattedDate: React.FC<FormattedDateProps> = ({
  value,
  options,
}): JSX.Element => {
  const { formatValue } = useDataFormat();

  return <>{formatValue(value, options)}</>;
};
