import { ReactNode } from 'react';
import { TooltipProps } from '@synerise/ds-tooltip';

export type Props = {
  label: ReactNode;
  onClick: () => void;
  tooltip?: ReactNode;
  tooltipProps?: Partial<TooltipProps>;
};
