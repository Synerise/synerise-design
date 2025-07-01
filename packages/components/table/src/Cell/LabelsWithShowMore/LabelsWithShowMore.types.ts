import { type Component, type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type ShowMoreTexts = {
  tooltip: ReactNode;
  searchPlaceholder: string;
  searchClear: string;
  modalTitle: ReactNode;
  records: ReactNode;
};

export type LabelsWithShowMoreProps<T extends object> = WithHTMLAttributes<
  HTMLDivElement,
  {
    items: T[];
    numberOfVisibleItems: number;
    labelKey: string;
    renderItem: (label: string, item: T) => JSX.Element | Component;
    texts: ShowMoreTexts;
    loading?: boolean;
  }
>;

/**
 *  @deprecated
 */
export type Props<T extends object> = LabelsWithShowMoreProps<T>;
