import type { ReactNode } from 'react';

export type AddBlankItemProps = {
  onItemAdd: () => void;
  addItemLabel: ReactNode;
  disabled: boolean;
};
