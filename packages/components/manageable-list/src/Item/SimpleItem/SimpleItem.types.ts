import * as React from 'react';
import { ItemProps } from '../Item.types';

export type Props = {
  item: ItemProps;
  onRemove?: (removeParams: { id: string }) => void;
  onSelect: (selectParams: { id: string }) => void;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  texts?: {
    [k: string]: string | React.ReactNode;
  };
};