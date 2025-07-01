import type { ReactNode } from 'react';

import type { LiteralStringUnion } from '@synerise/ds-utils';

export type CompletedWithinTexts = {
  clear: ReactNode;
  header: ReactNode;
  completedLabel: ReactNode;
  periodPlaceholder: ReactNode;
};

export type Period =
  | LiteralStringUnion<
      'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'MONTHS' | 'YEARS'
    >
  | undefined;

export type CustomPeriod = {
  value: Period;
  label: ReactNode;
};

export type PeriodValue = {
  period: Period;
  value?: number;
};

export type CompletedWithinProps = {
  text?: CompletedWithinTexts;
  value: PeriodValue;
  maxValue?: PeriodValue['value'];
  onSetValue: (value: PeriodValue) => void;
  periods?: CustomPeriod[];
  placeholder?: string;
  tooltip?: string;
  readOnly?: boolean;
};
