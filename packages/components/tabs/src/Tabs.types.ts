import * as React from 'react';

export type TabsProps = {
  activeTab: number;
  tabs: TabItem[];
  handleTabClick: (index: number) => void;
  configuration?: Configuration;
  underscore?: boolean;
  block?: boolean;
};

export type Configuration = {
  action: () => void;
  label: string;
  disabled?: boolean;
};

export type TabItem = {
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type TabWithRef = TabItem & {
  ref: React.RefObject<HTMLButtonElement>;
};
