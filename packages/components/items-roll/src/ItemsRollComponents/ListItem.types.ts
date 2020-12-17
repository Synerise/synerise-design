import * as React from 'react';
import { ItemRollElement, ItemsRollGroup } from '../ItemsRoll.types';

export type ItemElementProps = {
  highlight: string;
  item: ItemRollElement;
  group?: ItemsRollGroup;
  onItemClick?: (id: string) => void;
  onItemRemove?: (id: string, group?: ItemsRollGroup) => void;
  removeTooltipLabel: string | React.ReactNode;
};
