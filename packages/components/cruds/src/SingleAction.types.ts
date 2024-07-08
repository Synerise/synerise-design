import type { HTMLAttributes, ReactNode } from 'react';

export type SingleActionProps = {
  title: ReactNode;
  className?: string;
  inactive?: boolean;
  onClick: () => void;
  icon: ReactNode;
  iconSize?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'className' | 'onClick'>;
