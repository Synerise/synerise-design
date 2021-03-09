import * as React from 'react';
import Daily from './Elements/Daily/Daily';
import { DateLimitMode } from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';

export type TimeWindowProps = {
  valueSelectionMode: DateLimitMode[];
};

const TimeWindow: React.FC<TimeWindowProps> = props => {
  return <Daily {...props} />;
};
export default TimeWindow;
