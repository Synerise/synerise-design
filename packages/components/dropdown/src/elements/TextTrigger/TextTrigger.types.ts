import * as React from 'react';

export type TextTriggerProps = {
  value: string | React.ReactNode | undefined;
  inactiveColor?: string;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  onClick: () => void;
};
