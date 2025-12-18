import { type Placement } from '@floating-ui/react';

import { PLACEMENT_MAP } from '../Popover.const';
import { type LegacyPlacement } from '../Popover.types';

export const getPlacement = (placement: LegacyPlacement): Placement => {
  return PLACEMENT_MAP[placement];
};
