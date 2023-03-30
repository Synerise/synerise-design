import * as React from 'react';

import { useDataFormat } from '../hooks';
import { NumberToFormatOptions } from '../types';

export type FormattedNumberProps = {
  value: number;
  options?: NumberToFormatOptions;
};

export const FormattedNumber: React.FC<FormattedNumberProps> = ({ value, options }): JSX.Element => {
  const { formatValue } = useDataFormat();

  return <>{formatValue(value, options)}</>;
};
