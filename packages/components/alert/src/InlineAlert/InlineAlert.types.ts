import * as React from 'react';

export type InlineAlertType = 'success' | 'alert' | 'warning';

export type InlineAlertProps = {
  type: InlineAlertType;
  message: string | React.ReactNode;
};
