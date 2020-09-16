import * as React from 'react';

export type Props = {
  onItemAdd?: (addParams: { name: string }) => void;
  addItemLabel: string | React.ReactNode;
  disabled: boolean;
  placeholder?: string;
};