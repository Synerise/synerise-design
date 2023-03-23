import * as React from 'react';

import { DateToFormatOptions } from '@synerise/ds-data-format';

export type Props = {
  autoFocus?: boolean;
  size?: 'large' | 'default' | 'small';
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  format?: string;
  valueFormatOptions?: DateToFormatOptions;
  showTime?: boolean;
  allowClear?: boolean;
  value?: Date | string;
  onChange?: (dateValue: Date | undefined | null, stringifiedDate: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  onClear?: () => void;
  clearTooltip?: string | React.ReactNode;
  highlight?: boolean;
  error?: boolean;
  errorText?: string | React.ReactNode;
  prefixel?: React.ReactNode | string;
  suffixel?: React.ReactNode | string;
};
