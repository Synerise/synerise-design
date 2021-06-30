import * as React from 'react';
import { ItemsRollGroup } from '../ItemsRoll.types';

export type ItemRendererProps = {
  highlight?: string;
  group?: ItemsRollGroup;
  onItemClick?: (id: string, group?: ItemsRollGroup) => void;
  onItemRemove?: (id: string, group?: ItemsRollGroup) => void;
  tooltipLabel: string | React.ReactNode;
};
