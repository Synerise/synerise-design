import { ReactNode } from 'react';

export interface Props {
  description?: Node;
  icon?: string;
  raised?: boolean;
  title?: Node;
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  tickVisible?: boolean;
  size: 'small' | 'medium';
  className?: string;
  iconSize?: number;
  customTickVisible?: boolean;
  customTickVisibleComponent?: ReactNode;
}
