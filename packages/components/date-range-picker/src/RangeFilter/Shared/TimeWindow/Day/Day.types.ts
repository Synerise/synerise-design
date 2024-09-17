import React from 'react';
import { IntlShape, WrappedComponentProps } from 'react-intl';
import { GridTexts } from '../Grid/Grid.types';
import { DayKey } from '../TimeWindow.types';

export type DayProps = {
  dayKey: DayKey;
  label: React.ReactNode | ((hovered: boolean) => React.ReactNode);
  restricted: boolean;
  active: boolean;
  onToggle: (dayKey: DayKey, forceState?: boolean) => void;
  onClear: (dayKey: DayKey) => void;
  readOnly?: boolean;
  texts: GridTexts;
  intl: IntlShape;
} & WrappedComponentProps;
