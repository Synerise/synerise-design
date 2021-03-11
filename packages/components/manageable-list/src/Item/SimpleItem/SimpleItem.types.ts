import * as React from 'react';
import { ItemProps } from '../Item.types';

export type Props = {
  item: ItemProps;
  onRemove?: (removeParams: { id: React.ReactText }) => void;
  onSelect: (selectParams: { id: React.ReactText }) => void;
  onUpdate?: (updateParams: { id: React.ReactText; name: string }) => void;
  texts?: {
    [k: string]: string | React.ReactNode;
  };
};
