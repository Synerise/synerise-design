import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

interface Props extends WrappedComponentProps {
  value: string;
  onChange: (v: string) => {};
}

class DailyFilter extends React.PureComponent<Props> {
  onChange = (value: string) => this.props.onChange(value[0]);

  render() {
    const { value } = this.props;
    return (
      <div>
        Time window
      </div>
/*      <TimeWindow
        style={{ marginTop: 32 }}
        invertibleTime
        numberOfDays={0}
        customDays={{ 0: { label: this.props.intl.formatMessage({ id: 'SNRS.DATE.EVERY_DAY' }) } }}
        days={[value]}
        onChange={this.onChange}
        timeMarks={{}}
      />*/
    );
  }
}

export default injectIntl(DailyFilter);
