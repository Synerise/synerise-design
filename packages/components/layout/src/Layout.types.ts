import * as React from 'react';

export interface Style<T> {
  left?: T;
  leftInner?: T;
  main?: T;
  mainInner?: T;
  right?: T;
  rightInner?: T;
}

export type SidebarProps = {
  content: React.ReactNode;
  opened: boolean;
  onChange: (isOpened: boolean) => void;
  width?: number;
};

export type LayoutProps = {
  header?: React.ReactNode;
  subheader?: React.ReactNode;
  left?: SidebarProps;
  right?: SidebarProps;
  children: React.ReactNode;
  className?: string;
  styles?: Style<React.CSSProperties>;
  fullPage?: boolean;
  sidebarAnimationDisabled?: boolean;
};
