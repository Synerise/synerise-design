import { type Dayjs } from 'dayjs';
import React from 'react';

import {
  RELATIVE_FROM,
  RELATIVE_FROM_WITHOUT_SUFFIX,
  RELATIVE_TO,
  RELATIVE_TO_WITHOUT_SUFFIX,
} from '../constants';
import { useDataFormat, useRelativeDateTimeUpdate } from '../hooks';
import { type DateToFormatOptions, type MomentLike } from '../types';

export type FormattedRelativeDateTimeProps = {
  value: Date | MomentLike | Dayjs;
  withoutSuffix?: boolean;
  options?: DateToFormatOptions;
};

export const FormattedRelativeDateTimeTo = ({
  value,
  withoutSuffix,
  options,
}: FormattedRelativeDateTimeProps): JSX.Element => {
  useRelativeDateTimeUpdate(value);
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
  useRelativeDateTimeUpdate(value);
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
