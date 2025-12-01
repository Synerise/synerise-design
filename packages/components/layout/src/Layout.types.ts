import { type CSSProperties, type ReactNode, type Ref } from 'react';

export interface ColumnProps<T> {
  left?: T;
  leftInner?: T;
  main?: T;
  mainInner?: T;
  right?: T;
  rightInner?: T;
}

export type SidebarProps = {
  content: ReactNode;
  opened: boolean;
  onChange: (isOpened: boolean) => void;
  width?: number;
};

export type LayoutProps = {
  nativeScroll?: boolean;
  nativeScrollRef?: Ref<HTMLDivElement>;
  header?: ReactNode;
  subheader?: ReactNode;
  left?: SidebarProps;
  right?: SidebarProps;
  children: ReactNode;
  className?: string;
  styles?: ColumnProps<CSSProperties>;
  fullPage?: boolean;
  fillViewport?: boolean;
  viewportTopOffset?: number;
  sidebarAnimationDisabled?: boolean;
  /**
   * Left sidebar: render visibility of show/hide button. Accepts function returning `ReactNode` (see source code).
   */
  renderLeftSidebarControls?: boolean | (() => ReactNode);
  /**
   * Right sidebar: render visibility of show/hide button. Accepts function returning `ReactNode` (see source code).
   */
  renderRightSidebarControls?: boolean | (() => ReactNode);
  leftSidebarWithDnd?: boolean;
  rightSidebarWithDnd?: boolean;
  leftSidebarWithScrollbar?: boolean;
  rightSidebarWithScrollbar?: boolean;
  mainSidebarWithDnd?: boolean;
};
