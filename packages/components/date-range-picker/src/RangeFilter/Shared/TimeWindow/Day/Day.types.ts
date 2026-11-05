import type { ReactNode } from 'react';
import type { IntlShape, WrappedComponentProps } from 'react-intl';

import type { GridTexts } from '../Grid/Grid.types';
import type { DayKey } from '../TimeWindow.types';

export type DayProps = {
  dayKey: DayKey;
  label: ReactNode | ((hovered: boolean) => ReactNode);
  restricted: boolean;
  active: boolean;
  onToggle: (dayKey: DayKey, forceState?: boolean) => void;
  onClear: (dayKey: DayKey) => void;
  readOnly?: boolean;
  texts: GridTexts;
  intl: IntlShape;
} & WrappedComponentProps;
