import { type Component, type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type ShowMoreTexts = {
  tooltip: ReactNode;
  searchPlaceholder: string;
  searchClear: string;
  modalTitle: ReactNode;
  records: ReactNode;
};

export type BaseLabelsWithShowMoreProps<T extends object> = {
  items: T[];
  numberOfVisibleItems: number;
  labelKey: keyof T;
  renderItem: (label: string, item: T) => JSX.Element | Component;
  texts: ShowMoreTexts;
  loading?: boolean;
};

export type LabelsWithShowMoreProps<T extends object> = WithHTMLAttributes<
  HTMLDivElement,
  BaseLabelsWithShowMoreProps<T>
>;

/**
 *  @deprecated
 */
export type Props<T extends object> = LabelsWithShowMoreProps<T>;
