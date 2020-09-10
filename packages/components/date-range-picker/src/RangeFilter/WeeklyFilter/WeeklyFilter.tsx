import * as React from 'react';
import TimeWindow from '../TimeWindow/TimeWindow';

class WeeklyFilter extends React.PureComponent {
  render(): JSX.Element {
    const { value, onChange, intl } = this.props;
    return (
      <TimeWindow
        style={{ marginTop: 32 }}
        title={intl.formatMessage({ id: 'SNRS.DATE.SELECT_DAY' })}
        showSelectAll
        invertibleTime
        dayTemplate={dayOfWeek => ({ day: dayOfWeek })}
        days={value}
        numberOfDays={32}
        onChange={(val): void => onChange(val)}
        timeMarks={{}}
        intl={intl}
      />
    );
  }
}

export default WeeklyFilter;
