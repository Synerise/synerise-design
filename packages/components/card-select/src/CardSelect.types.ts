import { ReactNode } from 'react';

export interface Props {
  icon?: ReactNode;
  raised?: boolean;
  description?: string | ReactNode;
  title?: string | ReactNode;
  value?: boolean;
  disabled?: boolean;
  tickVisible?: boolean;
  size?: 'small' | 'medium';
  className?: string;
  iconSize?: number;
  stretchToFit?: boolean;
  customTickVisible?: boolean;
  customTickVisibleComponent?: ReactNode;
  theme: { [k: string]: string };
  onChange?: (value: boolean) => void;
  onClick?: () => void;
}
