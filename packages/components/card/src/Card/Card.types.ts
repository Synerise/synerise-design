import { ReactNode, CSSProperties } from 'react';

export interface Props {
  raised?: boolean;
  disabled?: boolean;
  className?: string;
  lively?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  withHeader?: boolean;
  compactHeader?: boolean;
  title?: string;
  description?: ReactNode | string;
  icon?: string;
  size?: 'medium';
  iconSize?: number;
  headerSideChildren?: ReactNode;
}
