import type { Key, ReactElement, ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type SummaryObjectsDirection = 'row' | 'column';

export type CardSummaryItemProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    key: Key;
    label?: ReactNode;
    value: ReactNode;
    valueButton?: ReactNode;
    summaryObjects?: ReactElement[];
    summaryObjectsDirection?: SummaryObjectsDirection;
  }
>;

export type CardSummaryProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    title?: ReactNode;
    items: CardSummaryItemProps[];
  }
>;
