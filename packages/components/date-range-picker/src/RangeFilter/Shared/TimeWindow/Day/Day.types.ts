import * as React from 'react';
import { WrappedComponentProps } from 'react-intl';
import { GridTexts } from '../Grid/Grid.types';
import { DayKey } from '../TimeWindow.types';

export type DayProps = {
  dayKey: DayKey;
  tooltip?: string;
  label: React.ReactNode | ((hovered: boolean) => React.ReactNode);
  restricted: boolean;
  active: boolean;
  onToggle: (dayKey: DayKey, forceState?: boolean) => void;
  readOnly: boolean;
  texts?: GridTexts;
} & WrappedComponentProps;
