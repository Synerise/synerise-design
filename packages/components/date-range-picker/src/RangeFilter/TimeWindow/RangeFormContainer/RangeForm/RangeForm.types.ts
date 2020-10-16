import * as React from 'react';

export type RangeFormProps = {
  title?: React.ReactNode;
  startDate: Date;
  endDate: Date;
  onStartChange: (value: Date) => void;
  onEndChange: (value: Date) => void;
  onExactHourSelect: (value: Date) => void;
};
