import { type ReactNode } from 'react';

export type ConfirmMessageProps = {
  displayDuration?: number;
  title: string;
  children?: ReactNode;
  onClick: (callback: () => void) => void;
  icon?: ReactNode;
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';
};
