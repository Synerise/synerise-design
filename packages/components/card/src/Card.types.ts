import { ReactNode, CSSProperties } from 'react';

export interface Props {
  raised?: boolean;
  disabled?: boolean;
  className?: string;
  lively?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  withHeader?: boolean;
  title?: string;
  description?: ReactNode | string;
  icon?: string;
  iconSize?: number;
  headerSideChildren?: ReactNode;
}
