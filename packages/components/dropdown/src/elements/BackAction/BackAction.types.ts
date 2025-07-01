import { type ReactNode } from 'react';

import { type TooltipProps } from '@synerise/ds-tooltip';

export type Props = {
  label: ReactNode;
  onClick: () => void;
  tooltip?: ReactNode;
  tooltipProps?: Partial<TooltipProps>;
};
