import { type CSSProperties, type ReactNode } from 'react';

import { type ButtonProps } from '@synerise/ds-button';

type CommonProps = {
  className?: string;
  description: ReactNode;
  errorText?: ReactNode;
  isError?: boolean;
  isFullWidth?: boolean;
  label?: ReactNode;
  style?: CSSProperties;
};

export type ActionAreaWithCustomActionProps = {
  customAction: ReactNode;
};

export type ActionAreaWithStandardActionProps = {
  action: () => void;
  actionLabel: ReactNode;
  buttonProps?: Partial<ButtonProps>;
};

export type ActionAreaProps = CommonProps &
  (ActionAreaWithCustomActionProps | ActionAreaWithStandardActionProps);
