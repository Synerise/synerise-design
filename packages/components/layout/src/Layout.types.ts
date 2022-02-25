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
  /**
   * Left sidebar: render visibility of show/hide button. Accepts function returning `ReactNode` (see source code).
   */
  renderLeftSidebarControls?: boolean | (() => React.ReactNode);
  /**
   * Right sidebar: render visibility of show/hide button. Accepts function returning `ReactNode` (see source code).
   */
  renderRightSidebarControls?: boolean | (() => React.ReactNode);
};
