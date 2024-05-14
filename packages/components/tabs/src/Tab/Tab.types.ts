import { ReactNode, RefObject } from 'react';

export type TabProps = {
  index: number;
  label?: ReactNode;
  icon?: ReactNode;
  underscore?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  onClick: (index: number) => void;
  forwardedRef: RefObject<HTMLButtonElement>;
  block?: boolean;
  suffixel?: ReactNode;
};
