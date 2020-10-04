import * as React from 'react';
import TimeWindow from '../TimeWindow/TimeWindow';
import { WeeklyFilterProps, Days } from './WeeklyFilter.types';

class WeeklyFilter extends React.PureComponent<WeeklyFilterProps> {
  render(): JSX.Element {
    const { value, onChange,onRangeClear,onRangePaste,onRangeCopy,rangeClipboard, intl } = this.props;
    return (
      <TimeWindow
        style={{ marginTop: 32 }}
        title={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.SELECT_DAY' })}
        showSelectAll
        invertibleTime
        dayTemplate={(dayOfWeek: React.ReactText): { day: React.ReactText } => ({ day: dayOfWeek })}
        days={value}
        numberOfDays={7}
        onChange={(val: Days): void => {
          console.log('onChange',val)
          onChange(val);
        }}
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
