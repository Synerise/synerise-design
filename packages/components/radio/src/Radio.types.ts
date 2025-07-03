import {
  type RadioGroupProps as AntdRadioGroupProps,
  type RadioProps as AntdRadioProps,
} from 'antd/lib/radio';
import { type ReactNode } from 'react';

export type RadioProps = AntdRadioProps & {
  description?: ReactNode;
  label?: ReactNode;
  /**
   * @deprecated, use label instead
   */

  children?: ReactNode;
};
/**
 * @deprecated, use RadioProps instead
 */

export type Props = RadioProps;

export type RadioGroupProps = AntdRadioGroupProps & {
  fullWidth?: boolean;
  big?: boolean;
};
