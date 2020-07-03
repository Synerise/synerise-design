import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

interface Props extends WrappedComponentProps {
  value: string;
  onChange: (v: string) => {};
}

class DailyFilter extends React.PureComponent<Props> {
  handleOnChange = (value: string): void => {
    const { onChange } = this.props;
    onChange && onChange(value[0]);
  };

  render(): JSX.Element {
    const { value, intl } = this.props;
    return (
      <div>
        Time window
      </div>
/*      <TimeWindow
        style={{ marginTop: 32 }}
        invertibleTime
        numberOfDays={0}
        customDays={{ 0: { label: intl.formatMessage({ id: 'SNRS.DATE.EVERY_DAY' }) } }}
        days={[value]}
        onChange={this.handleOnChange}
        timeMarks={{}}
      />*/
    );
  }
}

export default injectIntl(DailyFilter);
