export type CardTabsProps = {
  className?: string;
  onChangeOrder?: (newOrder: CardTabsItem[]) => void;
  onAddTab?: () => void;
  addTabLabel?: string;
  maxTabsCount?: number;
  children?: JSX.Element[];
};

export type CardTabsItem = {
  id: number;
  name: string;
  tag: string;
};
