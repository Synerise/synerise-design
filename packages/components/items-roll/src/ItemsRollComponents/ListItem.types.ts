import * as React from 'react';
import { ItemRollElement } from '../ItemsRoll.types';

export type ItemElementProps = {
  highlight: string;
  item: ItemRollElement;
  onItemClick?: (id: string) => void;
  onItemRemove?: (id: string) => void;
  removeTooltipLabel: string | React.ReactNode;
};
