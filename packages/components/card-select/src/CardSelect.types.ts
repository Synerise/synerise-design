import { ReactNode } from 'react';

export interface Props {
  icon?: ReactNode;
  raised?: boolean;
  description?: string | ReactNode;
  title?: string | ReactNode;
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  tickVisible?: boolean;
  size?: 'small' | 'medium';
  className?: string;
  iconSize?: number;
  stretchToFit?: boolean;
  customTickVisible?: boolean;
  customTickVisibleComponent?: ReactNode;
  theme: { [k: string]: string };
}
