import * as React from 'react';
import { injectIntl } from 'react-intl';
import TimeWindow from '../../TimeWindow/TimeWindow';
import { Props } from './WeeklyFilter.types';

class WeeklyFilter extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { value, onChange, intl } = this.props;
    return (
      <TimeWindow
        style={{ marginTop: 32 }}
        title={intl.formatMessage({ id: 'SNRS.DATE.SELECT_DAY' })}
        showSelectAll
        invertibleTime
        dayTemplate={(dayOfWeek: React.ReactText): { day: React.ReactText } => ({ day: dayOfWeek })}
        days={value}
        onChange={(val: string): void => onChange(val)}
        timeMarks={{}}
      />
    );
  }
}

export default injectIntl(WeeklyFilter);
