import type React from 'react';

export type InlineAlertType = 'success' | 'alert' | 'warning' | 'info';

export type InlineAlertProps = {
  type: InlineAlertType;
  message: string | React.ReactNode;
};
