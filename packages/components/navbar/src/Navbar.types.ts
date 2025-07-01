import { type ReactNode } from 'react';

export type NavbarProps = {
  className?: string;
  color?: string;
  description: ReactNode;
  logo: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  additionalNodes?: ReactNode[];
  alertNotification?: ReactNode;
};
