import { type Placement } from '@floating-ui/react';

import { PLACEMENT_MAP } from '../Dropdown.const';
import { type DropdownPlacement } from '../Dropdown.types';

export const getPlacement = (placement: DropdownPlacement): Placement => {
  return PLACEMENT_MAP[placement];
};
