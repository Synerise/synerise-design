import { type ReactNode } from 'react';

export interface CardGroupProps {
  className?: string;
  children: ReactNode;
  columns: number;
}
