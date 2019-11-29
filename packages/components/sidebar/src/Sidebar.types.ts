import * as React from 'react';

export type SidebarProps = {
  children: React.ReactNode;
  order?: string[];
  onChangeOrder?: (order: string[] | string) => void;
  defaultActiveKey?: string[];
};

export type PanelProps = {
  header: React.ReactNode | string;
  children: React.ReactNode | string;
  id: string;
};

export type SidebarContextType = {
  order: string[] | string;
  setOrder: (dragIndex: number, hoverIndex: number) => void;
};

export type CompareFnType = (a: React.ReactElement<PanelProps>, b: React.ReactElement<PanelProps>) => number;
