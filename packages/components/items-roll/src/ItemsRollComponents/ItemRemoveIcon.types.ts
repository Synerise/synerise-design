import type { ReactNode } from 'react';
import type { ItemsRollGroup } from '../ItemsRoll.types';

export type RemoveIconProps = {
  id: string;
  group?: ItemsRollGroup;
  handleRemove: (id: string, group?: ItemsRollGroup) => void;
  tooltipLabel: ReactNode;
};
