import type { ReactNode } from 'react';

import type { ItemsRollGroup } from '../ItemsRoll.types';

export type ItemRendererProps = {
  highlight?: string;
  group?: ItemsRollGroup;
  onItemClick?: (id: string, group?: ItemsRollGroup) => void;
  onItemRemove?: (id: string, group?: ItemsRollGroup) => void;
  tooltipLabel: ReactNode;
};
