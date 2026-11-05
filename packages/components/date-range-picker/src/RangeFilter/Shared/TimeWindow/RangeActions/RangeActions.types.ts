import type { ReactNode } from 'react';

import type { RangeActions } from '../TimeWindow.types';

export type RangeActionsProps = {
  texts: ActionsTexts;
} & Partial<RangeActions>;
export type ActionsTexts = {
  copyRange: ReactNode;
  clearRange: ReactNode;
  pasteRange: ReactNode;
};
