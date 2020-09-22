import * as React from 'react';

export type IconProps = {
  color?: string;
  name?: string;
  title?: string;
  size?: string | number;
  stroke?: boolean;
  onClick?: React.MouseEventHandler;
  component?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;
