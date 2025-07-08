import { type CollapseProps } from 'antd/lib/collapse';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type SidebarProps = CollapseProps & {
  children: ReactNode;
  order?: string[];
  onChangeOrder?: (order: Order) => void;
  getPopupContainer?: (node: HTMLDivElement) => HTMLElement;
};

export type PanelProps = {
  header: ReactNode;
  children: ReactNode;
  id: string;
  draggable?: boolean;
  isActive?: boolean;
  forceRender?: boolean;
  dragHandleProps?: HTMLAttributes<HTMLDivElement>;
};

export type SidebarContextType = {
  isSortable?: boolean;
};

export type Order = string[] | string;

export type CompareFnType = (
  a: ReactElement<PanelProps>,
  b: ReactElement<PanelProps>,
) => number;
