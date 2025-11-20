import { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type CopyTooltipTexts = {
  copyTooltip: ReactNode;
  copiedTooltip: ReactNode;
};

export type TooltipPlacement =
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

export type CopyIconProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    copyValue: string;
    texts?: Partial<CopyTooltipTexts>;
    icon?: ReactNode;
    placement?: TooltipPlacement;
    onCopy?: () => void;
  }
>;
