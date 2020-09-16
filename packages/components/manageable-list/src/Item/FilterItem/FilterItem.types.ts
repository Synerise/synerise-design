import * as React from 'react';
import { ItemProps } from '../Item';

export interface FilterItemProps {
  item: ItemProps;
  greyBackground?: boolean;
  onRemove?: (removeParams: { id: string }) => void;
  onDuplicate?: (duplicateParams: { id: string }) => void;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  onSelect: (selectParams: { id: string }) => void;
  selected: boolean;
  texts: {
    [k: string]: string | React.ReactNode;
  };
  theme: { [k: string]: string };
  searchQuery?: string;
  style?: React.CSSProperties;
}
