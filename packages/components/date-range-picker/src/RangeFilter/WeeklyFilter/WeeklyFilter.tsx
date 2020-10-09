import * as React from 'react';
import TimeWindow from '../TimeWindow/TimeWindow';
import { WeeklyFilterProps } from './WeeklyFilter.types';

class WeeklyFilter extends React.PureComponent<WeeklyFilterProps> {
  render(): JSX.Element {
    const { value, onChange, onRangeClear, onRangePaste, onRangeCopy, rangeClipboard, intl } = this.props;
    return (
      <TimeWindow
        showSelectAll
        showUnselectAll
        invertibleTime
        dayTemplate={(dayOfWeek: React.ReactText): { day: React.ReactText } => ({ day: dayOfWeek })}
        days={value}
        numberOfDays={7}
        onChange={onChange}
        timeMarks={{}}
        intl={intl}
        onRangePaste={onRangePaste}
        onRangeCopy={onRangeCopy}
        onRangeClear={onRangeClear}
        rangeClipboard={rangeClipboard}
      />
    );
  }
}

export default WeeklyFilter;
