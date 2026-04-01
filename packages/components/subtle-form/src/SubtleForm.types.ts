import type { ReactElement, ReactNode } from 'react';

import { type FormFieldCommonProps } from '@synerise/ds-form-field';

export type SubtleFieldProps = {
  active?: boolean;
  disabled?: boolean;
  labelTooltip?: FormFieldCommonProps['tooltip'];
  suffix?: boolean;
  suffixTooltip?: ReactNode;
  activeElement?: () => ReactElement;
  inactiveElement?: () => ReactElement;
  mask?: string;
  maskVisible?: boolean;
} & Pick<FormFieldCommonProps, 'label' | 'errorText'>;
