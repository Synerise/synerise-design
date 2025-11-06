import { type UseTransitionStylesProps } from '@floating-ui/react';

export const getDefaultTransitionConfig =
  (): Partial<UseTransitionStylesProps> => {
    return {
      open: {
        opacity: 1,
      },
      initial: {
        opacity: 0,
      },
    };
  };
