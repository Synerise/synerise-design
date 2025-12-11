import {
  type Placement,
  type UseTransitionStylesProps,
} from '@floating-ui/react';

export const getTransitionConfig = ({
  placement,
}: {
  placement: Placement;
}): Partial<UseTransitionStylesProps> => {
  const isTop = placement.indexOf('top');
  return {
    open: {
      transform: 'scaleY(1)',
    },
    initial: {
      transform: 'scaleY(0)',
    },
    common: {
      transformOrigin: isTop ? 'top' : 'bottom',
    },
  };
};
