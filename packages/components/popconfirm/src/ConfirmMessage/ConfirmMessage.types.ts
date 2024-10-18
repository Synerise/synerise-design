import { ReactNode } from 'react';

export type ConfirmMessageProps = {
  displayDuration?: number;
  title: string;
  onClick: (callback: () => void) => void;
  icon?: ReactNode;
  children?: ReactNode;
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
}
