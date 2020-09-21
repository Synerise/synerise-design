import * as React from 'react';

export type NavbarProps = {
  className?: string;
  color?: string;
  description: string;
  logo: React.ReactNode | string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  additionalNodes?: React.ReactNode[];
};
