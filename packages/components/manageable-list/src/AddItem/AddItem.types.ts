import type React from 'react';

export type AddItemProps = {
  onItemAdd: () => void;
  addItemLabel: string | React.ReactNode;
  disabled: boolean;
};
