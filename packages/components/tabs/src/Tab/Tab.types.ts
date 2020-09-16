import * as React from 'react';

export type TabProps = {
  index: number;
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  underscore?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  onClick: (index: number) => void;
  forwardedRef: React.RefObject<HTMLButtonElement>;
  block?: boolean;
};
