import type { CardTabProps } from './CardTab/CardTab.types';

export type CardTabsProps = {
  className?: string;
  onChangeOrder?: (newOrder: CardTabsItem[]) => void;
  onAddTab?: () => void;
  addTabLabel?: string;
  maxTabsCount?: number;
  children?: JSX.Element[];
};

export type CardTabsItem = Partial<CardTabProps>;
