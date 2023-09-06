import { ReactNode } from 'react';
import { ButtonProps } from '@synerise/ds-button';

export type ActionAreaProps = {
  label?: ReactNode;
  description: ReactNode;
  action: () => void;
  actionLabel: ReactNode;
  buttonProps?: Partial<ButtonProps>;
};
