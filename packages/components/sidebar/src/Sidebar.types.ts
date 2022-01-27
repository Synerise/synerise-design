import * as React from 'react';

export type SidebarProps = {
  children: React.ReactNode;
  order?: string[];
  onChangeOrder?: (order: Order) => void;
  defaultActiveKey?: string[];
};

export type PanelProps = {
  header: React.ReactNode | string;
  children: React.ReactNode | string;
  id: string;
};

export type DraggablePanelProps = {
  id: string;
  order?: Order;
  context?: SidebarContextType;
};

export type SidebarContextType = {
  order: Order;
  setOrder: (dragIndex: number, hoverIndex: number) => void;
};

export type Order = string[] | string;

export type CompareFnType = (a: React.ReactElement<PanelProps>, b: React.ReactElement<PanelProps>) => number;
