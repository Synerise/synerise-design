import { type InputNumberProps } from '@synerise/ds-input-number';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type InputNumberCellProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    inputNumberProps?: InputNumberProps;
    disabled?: boolean;
  }
>;
