import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TimeWindow from '../../TimeWindow/TimeWindow';
class WeeklyFilter extends React.PureComponent {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
  };

  render() {
    const { value, onChange, intl } = this.props;
    return (
      <TimeWindow
        style={{ marginTop: 32 }}
        title={intl.formatMessage({ id: 'SNRS.DATE.SELECT_DAY' })}
        showSelectAll
        invertibleTime
        dayTemplate={dayOfWeek => ({ day: dayOfWeek })}
        days={value}
        onChange={value => onChange(value)}
        timeMarks={{}}
      />
    );
  }
}

export default injectIntl(WeeklyFilter);
