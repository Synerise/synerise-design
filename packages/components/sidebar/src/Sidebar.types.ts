import * as React from 'react';

export type SidebarProps = {
  children: React.ReactNode | string;
  order?: string[] | string;
  onChangeOrder?: (order: string[] | string) => void;
  defaultActiveKey?: Array<string>;
};

export type PanelProps = {
  header: React.ReactNode;
  children: React.ReactNode | string;
  id: string;
};

export type SidebarContextType = {
  order: string[] | string;
  setOrder: (dragIndex: number, hoverIndex: number) => void;
};

export type CompareFnType = (a: React.ReactElement<PanelProps>, b: React.ReactElement<PanelProps>) => number;
