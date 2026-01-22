import { action } from 'storybook/actions';

import { AllocationVariant } from '@synerise/ds-slider';

export const VARIANTS: AllocationVariant[] = [
  { name: 'Variant A', percentage: 30, tabId: 1, tabLetter: 'A' },
  { name: 'Variant B', percentage: 20, tabId: 2, tabLetter: 'B' },
  { name: 'Variant C', percentage: 40, tabId: 3, tabLetter: 'C' },
  { name: 'Variant D', percentage: 10, tabId: 3, tabLetter: 'D' },
];
export const VARIANTS_WITH_CG: AllocationVariant[] = [...VARIANTS.slice(0, -1)];

export const TRACKS_COLOR_MAP = {
  '0': 'cyan-600',
  '1': 'yellow-600',
  '2': 'pink-600',
  '3': 'green-600',
  '4': 'mars-600',
  '5': 'orange-600',
  '6': 'purple-600',
  '7': 'violet-600',
  '8': 'red-600',
  '9': 'fern-600',
};

export const ALLOCATION_CONFIG = {
  variants: VARIANTS,
  onAllocationChange: action('onAllocationChange'),
  controlGroupEnabled: false,
};
export const ALLOCATION_CONFIG_WITH_CG = {
  ...ALLOCATION_CONFIG,
  variants: VARIANTS_WITH_CG,
  controlGroupEnabled: true,
  controlGroupLabel: 'CG',
  controlGroupTooltip: 'Control group',
};
