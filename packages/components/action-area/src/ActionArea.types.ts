import { CSSProperties, ReactNode } from 'react';
import { ButtonProps } from '@synerise/ds-button';

export type ActionAreaProps = {
  action: () => void;
  actionLabel: ReactNode;
  buttonProps?: Partial<ButtonProps>;
  className?: string;
  description: ReactNode;
  errorText?: ReactNode;
  isError?: boolean;
  isFullWidth?: boolean;
  label?: ReactNode;
  style?: CSSProperties;
};
