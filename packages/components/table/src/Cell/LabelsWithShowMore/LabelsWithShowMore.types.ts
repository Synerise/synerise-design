import * as React from 'react';

export type Props<T extends object> = {
  items: T[];
  numberOfVisibleItems: number;
  tooltip: string | React.ReactNode;
  labelKey: string;
  renderItem: (label: string, item: T) => Element;
  title: string | React.ReactNode;
};
