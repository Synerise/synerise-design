import { type ButtonGroupProps as AntButtonGroupProps } from 'antd/lib/button/button-group';
import { type ReactNode } from 'react';

import { type LiteralStringUnion } from '@synerise/ds-utils';

export type ButtonGroupProps = AntButtonGroupProps & {
  children?: ReactNode;
  title?: string;
  description?: string;
  fullWidth?: boolean;
  buttonsPosition?: LiteralStringUnion<'left' | 'center' | 'right'>;
  disabled?: boolean;
  splitMode?: boolean;
  error?: boolean;
  compact?: boolean;
};
