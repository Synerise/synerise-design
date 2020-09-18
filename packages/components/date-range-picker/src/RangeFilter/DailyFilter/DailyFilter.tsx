import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import RangeForm from './RangeForm/RangeForm';
import dayjs from 'dayjs';

export interface Props extends WrappedComponentProps {
  value: string;
  onChange: (v: string) => {};
}

const TODAY = new Date();

class DailyFilter extends React.PureComponent<Props> {
  onChange = (value: string) => {
    const { onChange } = this.props;
    onChange && onChange(value[0]);
  };

  render(): JSX.Element {
    const { value, intl } = this.props;
    return (
      <RangeForm startDate={dayjs(TODAY).startOf('day')} endDate={dayjs(TODAY).endOf('day')}/>
    );
  }
}

export default injectIntl(DailyFilter);
