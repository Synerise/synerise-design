import * as React from 'react';

export type SingleActionProps = {
  title: React.ReactNode | string;
  className?: string;
  inactive?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  iconSize?: number;
};
