import { IntlShape, WrappedComponentProps } from 'react-intl';
import * as React from 'react';
import { Day } from '../../RangeFilter/RangeFilter.types';

export type Props = {
  tooltip?: string | React.ReactNode;
  label?: React.ReactNode | string;
  restricted: boolean;
  active?: boolean;
  onToggle?: (toggleState?: boolean | undefined) => void;
  onChange?: (dayChange: Day) => void;
  value?: {
    values: DayValues[];
  };
  readOnly?: boolean;
  style?: React.CSSProperties;
  intl?: IntlShape;

} & WrappedComponentProps;

export type DayValues = {
  startTime: string;
  endTime: string;
};
