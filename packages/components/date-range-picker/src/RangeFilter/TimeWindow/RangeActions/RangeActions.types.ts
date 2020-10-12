import * as React from 'react';
import { RangeActions } from '../TimeWindow.types';

export type RangeActionsProps = {
  texts: ActionsTexts;

} & Partial<RangeActions>
export type ActionsTexts = {
  copyRange: string | React.ReactNode;
  clearRange: string | React.ReactNode;
  pasteRange: string | React.ReactNode;
}