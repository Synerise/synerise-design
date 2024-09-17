import React from 'react';
import { ItemsRollGroup } from '../ItemsRoll.types';

export type RemoveIconProps = {
  id: string;
  group?: ItemsRollGroup;
  handleRemove: (id: string, group?: ItemsRollGroup) => void;
  tooltipLabel: string | React.ReactNode;
};
