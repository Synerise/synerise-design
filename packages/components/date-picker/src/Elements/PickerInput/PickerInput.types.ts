import * as moment from 'moment';

import * as React from 'react';

type MomentDateType = ReturnType<typeof moment>;
export type Props = {
  size?: 'large' | 'default' | 'small';
  format?: string;
  showTime?: boolean;
  allowClear?: boolean;
  value?: MomentDateType;
  onChange?: (dateValue: MomentDateType | null, stringifiedDate: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  onClick?: () => void;
  onClear?: () => void;
  clearTooltip?: string | React.ReactNode;
  highlight?: boolean;
  error?: boolean;
  errorText?: string | React.ReactNode;
};
