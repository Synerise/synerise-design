// import { type UseTransitionStylesProps } from '@floating-ui/react';
import { type OffsetConfig } from '@synerise/ds-popover';

import { type TooltipProps } from './Tooltip.types';

export const getTransitionConfig = () => {
  return {
    open: {
      opacity: 1,
    },
    initial: {
      opacity: 0,
    },
  };
};

export const getOffsetConfig = (
  offset: TooltipProps['offset'],
): OffsetConfig => ({
  mainAxis: offset === 'small' ? 4 : 8,
});
