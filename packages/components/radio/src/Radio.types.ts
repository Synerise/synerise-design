import { ReactNode } from 'react';
import { RadioProps as AntdRadioProps, RadioGroupProps as AntdRadioGroupProps } from 'antd/lib/radio';

export type RadioProps = AntdRadioProps & {
  description?: ReactNode;
};
// @deprecated, use RadioProps instead
export type Props = RadioProps;

export type RadioGroupProps = AntdRadioGroupProps & {
  fullWidth?: boolean;
  big?: boolean;
};
