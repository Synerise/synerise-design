import * as React from 'react';

export interface CardSelectProps {
  icon?: React.ReactNode;
  raised?: boolean;
  description?: string | React.ReactNode;
  title?: string | React.ReactNode;
  value?: boolean;
  disabled?: boolean;
  tickVisible?: boolean;
  size?: 'small' | 'medium';
  className?: string;
  iconSize?: number;
  tickSize?: number;
  stretchToFit?: boolean;
  customTickVisible?: boolean;
  customTickVisibleComponent?: React.ReactNode;
  theme: { [k: string]: string };
  onChange?: (value: boolean) => void;
  onClick?: () => void;
  elementsPosition?: string | 'left' | 'center' | 'right';
}
