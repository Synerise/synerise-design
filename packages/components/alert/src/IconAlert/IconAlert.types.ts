import type React from 'react';

export type IconAlertType = 'success' | 'alert' | 'warning' | 'info';

export type IconAlertProps = {
  type: IconAlertType;
  message?: React.ReactNode;
  withEmphasis?: React.ReactNode;
  withLink?: React.ReactNode;
  iconAlert?: boolean;
  hoverButton?: boolean;
  disabled?: boolean;
  customIcon?: React.ReactNode;
};
