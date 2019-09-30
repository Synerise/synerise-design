import { ReactNode } from 'react';

export interface Props {
  icon?: string;
  raised?: boolean;
  description?: string | ReactNode;
  title?: string | ReactNode;
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
