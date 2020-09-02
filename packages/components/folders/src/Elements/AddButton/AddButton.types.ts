import * as React from 'react';
import { FolderItem } from '../../Folders.types';

export type Props = {
  onItemAdd?: (addParams: FolderItem) => void;
  addItemLabel: string | React.ReactNode;
  disabled: boolean;
  placeholder?: string;
};
