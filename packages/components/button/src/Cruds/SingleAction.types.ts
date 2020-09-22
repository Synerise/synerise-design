import * as React from 'react';

export type SingleActionProps = {
  title: React.ReactNode | string;
  className?: string;
  onClick: () => void;
  icon: React.ReactNode;
  iconSize?: number;
};
