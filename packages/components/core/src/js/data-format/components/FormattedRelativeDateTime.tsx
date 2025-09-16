import { type Dayjs } from 'dayjs';
import { type Moment } from 'moment';
import React from 'react';

import {
  RELATIVE_FROM,
  RELATIVE_FROM_WITHOUT_SUFFIX,
  RELATIVE_TO,
  RELATIVE_TO_WITHOUT_SUFFIX,
} from '../constants';
import { useDataFormat } from '../hooks';
import { type DateToFormatOptions } from '../types';

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
    <>
      {formatValue(value, {
        ...options,
        targetFormat: withoutSuffix ? RELATIVE_TO_WITHOUT_SUFFIX : RELATIVE_TO,
      })}
    </>
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
      {formatValue(value, {
        ...options,
        targetFormat: withoutSuffix
          ? RELATIVE_FROM_WITHOUT_SUFFIX
          : RELATIVE_FROM,
      })}
    </>
  );
};
