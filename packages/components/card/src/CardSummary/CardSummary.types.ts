import { HTMLAttributes, ReactElement, ReactNode, Key } from 'react';

export type CardSummaryItemProps = {
  key: Key;
  label?: ReactNode;
  value: ReactNode;
  summaryRowObjects?: ReactElement[];
} & HTMLAttributes<HTMLDivElement>;

export type CardSummaryProps = {
  title?: ReactNode;
  items: CardSummaryItemProps[];
} & HTMLAttributes<HTMLDivElement>;
