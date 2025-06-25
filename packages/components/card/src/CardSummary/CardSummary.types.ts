import type { ReactElement, ReactNode, Key } from 'react';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type CardSummaryItemProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    key: Key;
    label?: ReactNode;
    value: ReactNode;
    valueButton?: ReactNode;
    summaryRowObjects?: ReactElement[];
  }
>;

export type CardSummaryProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    title?: ReactNode;
    items: CardSummaryItemProps[];
  }
>;
