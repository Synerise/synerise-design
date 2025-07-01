import { type CollapseProps } from 'antd/lib/collapse';
import type { ReactElement, ReactNode } from 'react';

export type SidebarProps = CollapseProps & {
  children: ReactNode;
  order?: string[];
  onChangeOrder?: (order: Order) => void;
};

export type PanelProps = {
  header: ReactNode;
  children: ReactNode;
  id: string;
};

export type DraggablePanelProps = {
  id: string;
  order?: Order;
  children?: ReactNode;
  context?: SidebarContextType;
};

export type SidebarContextType = {
  order: Order;
  setOrder: (dragIndex: number, hoverIndex: number) => void;
};

export type Order = string[] | string;

export type CompareFnType = (
  a: ReactElement<PanelProps>,
  b: ReactElement<PanelProps>,
) => number;
