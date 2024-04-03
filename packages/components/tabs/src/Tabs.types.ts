import { ReactNode, RefObject } from 'react';

export type TabsProps = {
  activeTab: number;
  tabs: TabItem[];
  handleTabClick: (index: number) => void;
  configuration?: Configuration;
  underscore?: boolean;
  block?: boolean;
  visible?: boolean;
};

export type Configuration = {
  action: () => void;
  label: string;
  disabled?: boolean;
};

export type TabItem = {
  label?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  suffixel?: ReactNode;
};

export type TabWithRef = TabItem & {
  ref: RefObject<HTMLButtonElement>;
};
