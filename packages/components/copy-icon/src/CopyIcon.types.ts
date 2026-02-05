import { type ReactNode } from 'react';

import { type TooltipProps } from '@synerise/ds-tooltip';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type CopyTooltipTexts = {
  copyTooltip: ReactNode;
  copiedTooltip: ReactNode;
};

export type CopyIconProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    copyValue: string;
    texts?: Partial<CopyTooltipTexts>;
    icon?: ReactNode;
    placement?: TooltipProps['placement'];
    onCopy?: () => void;
  }
>;
