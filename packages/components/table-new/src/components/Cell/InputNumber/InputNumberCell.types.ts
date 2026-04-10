import { type InputNumberProps } from '@synerise/ds-input-number';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseInputNumberCellProps = {
  inputNumberProps?: InputNumberProps;
  disabled?: boolean;
};

export type InputNumberCellProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseInputNumberCellProps
>;
