import { ComponentType } from 'react';
import * as moment from 'moment';

import * as React from 'react';
import { Props as ContentComponentProps } from '../../DatePicker.types';

type MomentDateType = ReturnType<typeof moment>;
export type Props = {
  size?: 'large' | 'default' | 'small';
  format?: string;
  showTime?: boolean;
  allowClear?: boolean;
  value?: MomentDateType;
  onChange?: (a: MomentDateType | null, b: MomentDateType | string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  disabledDate?: (currentDate: MomentDateType) => boolean;
  disabledHours?: number[];
  disabledMinutes?: number[];
  disabledSeconds?: number[];
  content?: ComponentType<ContentComponentProps>;
};

export type State = {
  visible: boolean;
};
