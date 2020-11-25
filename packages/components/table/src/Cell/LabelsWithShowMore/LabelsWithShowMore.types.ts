import * as React from 'react';

export type ShowMoreTexts = {
  tooltip: string | React.ReactNode;
  searchPlaceholder: string;
  searchClear: string;
  modalTitle: string | React.ReactNode;
  records: string | React.ReactNode;
};

export type Props<T extends object> = {
  items: T[];
  numberOfVisibleItems: number;
  labelKey: string;
  renderItem: (label: string, item: T) => JSX.Element | React.Component;
  texts: ShowMoreTexts;
  loading?: boolean;
};
