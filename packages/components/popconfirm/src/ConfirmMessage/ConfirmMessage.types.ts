import * as React from 'react';

export interface ConfirmMessageProps {
  displayDuration?: number;
  title: string;
  onClick: (callback: () => void) => void;
  icon?: React.ReactNode;
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
