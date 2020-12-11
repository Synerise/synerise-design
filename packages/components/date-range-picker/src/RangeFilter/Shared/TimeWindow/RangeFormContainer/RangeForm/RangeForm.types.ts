import * as React from 'react';

export type DateLimitMode = 'Hour' | 'Range';
export type RangeFormProps = {
  mode: DateLimitMode;
  onModeChange: (mode: DateLimitMode) => void;
  title?: React.ReactNode;
  startDate: Date;
  endDate: Date;
  onStartChange: (value: Date) => void;
  onEndChange: (value: Date) => void;
  onExactHourSelect: (value: Date) => void;
  onRangeDelete?: () => void;
};
