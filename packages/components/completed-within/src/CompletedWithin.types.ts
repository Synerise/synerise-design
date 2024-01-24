import * as React from 'react';

export type CompletedWithinTexts = {
  clear: string | React.ReactNode;
  header: string | React.ReactNode;
  completedLabel: string | React.ReactNode;
  periodPlaceholder: string | React.ReactNode;
};

export type Period = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'MONTHS' | 'YEARS' | string | undefined;

export type CustomPeriod = {
  value: Period;
  label: string | React.ReactNode;
};

export type PeriodValue = {
  period: Period;
  value: number | undefined;
};

export type CompletedWithinProps = {
  text?: CompletedWithinTexts;
  value: PeriodValue;
  maxValue?: PeriodValue['value'];
  onSetValue: (value: PeriodValue) => void;
  periods?: CustomPeriod[];
  placeholder?: string | undefined;
  tooltip?: string;
  readOnly?: boolean;
};
