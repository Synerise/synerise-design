import * as React from 'react';
import { injectIntl } from 'react-intl';
import { TimeWindow } from '../../TimeWindow/TimeWindow';
import { Props } from './DailyFilter.types';

class DailyFilter extends React.PureComponent<Props> {
  handleOnChange = (value: string): void => {
    const { onChange } = this.props;
    onChange && onChange(value[0]);
  };

  render(): JSX.Element {
    const { value, intl } = this.props;
    return (
      <TimeWindow
        style={{ marginTop: 32 }}
        invertibleTime
        numberOfDays={0}
        customDays={{ 0: { label: intl.formatMessage({ id: 'SNRS.DATE.EVERY_DAY' }) } }}
        days={[value]}
        onChange={this.handleOnChange}
        timeMarks={{}}
      />
    );
  }
}

export default injectIntl(DailyFilter);
