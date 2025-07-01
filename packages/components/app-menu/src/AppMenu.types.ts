import { type ReactNode, type ReactNodeArray } from 'react';

export type AppMenuProps = {
  className?: string;
  activeItem: string;
  footer?: ReactNode;
  children: ReactNodeArray;
  top?: number;
};
