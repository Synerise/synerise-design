import { type ReactNode } from 'react';

export type DropdownFooterSplit = {
  left?: ReactNode;
  right?: ReactNode;
};
export type DropdownFooterProps = {
  footer: ReactNode | DropdownFooterSplit;
};
