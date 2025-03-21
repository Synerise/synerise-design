import type { ReactNode } from 'react';

export type Props = {
  onItemAdd?: (addParams: { name: string }) => void;
  addItemLabel: ReactNode;
  disabled: boolean;
  placeholder?: string;
};
