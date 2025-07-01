import type React from 'react';

import { type RangeActions } from '../TimeWindow.types';

export type RangeActionsProps = {
  texts: ActionsTexts;
} & Partial<RangeActions>;
export type ActionsTexts = {
  copyRange: string | React.ReactNode;
  clearRange: string | React.ReactNode;
  pasteRange: string | React.ReactNode;
};
