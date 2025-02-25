import React from 'react';
import { Moment } from 'moment';
import { Dayjs } from 'dayjs';

import { useDataFormat } from '../hooks';
import { DateToFormatOptions } from '../types';
import { RELATIVE_FROM_WITHOUT_SUFFIX, RELATIVE_FROM, RELATIVE_TO, RELATIVE_TO_WITHOUT_SUFFIX } from '../constants';

export type FormattedRelativeDateTimeProps = {
  value: Date | Moment | Dayjs;
  withoutSuffix?: boolean;
  options?: DateToFormatOptions;
};

export const FormattedRelativeDateTimeTo = ({
  value,
  withoutSuffix,
  options,
}: FormattedRelativeDateTimeProps): JSX.Element => {
  const { formatValue } = useDataFormat();

  return (
    <>{formatValue(value, { ...options, targetFormat: withoutSuffix ? RELATIVE_TO_WITHOUT_SUFFIX : RELATIVE_TO })}</>
  );
};

export const FormattedRelativeDateTimeFrom = ({
  value,
  withoutSuffix,
  options,
}: FormattedRelativeDateTimeProps): JSX.Element => {
  const { formatValue } = useDataFormat();

  return (
    <>
      {formatValue(value, { ...options, targetFormat: withoutSuffix ? RELATIVE_FROM_WITHOUT_SUFFIX : RELATIVE_FROM })}
    </>
  );
};
