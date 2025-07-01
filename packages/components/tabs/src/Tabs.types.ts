import type { ReactNode, RefObject } from 'react';

import type { TooltipProps } from '@synerise/ds-tooltip';

export type TabsProps = {
  activeTab: number;
  tabs: TabItem[];
  handleTabClick: (index: number) => void;
  configuration?: Configuration;
  underscore?: boolean;
  block?: boolean;
  // @deprecated
  visible?: boolean;
};

export type Configuration = {
  action: () => void;
  label: string;
  disabled?: boolean;
};

export type TabItem = {
  tooltip?: ReactNode;
  tooltipProps?: TooltipProps;
  label?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  suffixel?: ReactNode;
};

export type TabWithRef = TabItem & {
  ref: RefObject<HTMLButtonElement>;
};
