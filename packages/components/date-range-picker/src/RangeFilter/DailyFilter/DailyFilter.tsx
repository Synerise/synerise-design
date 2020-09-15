import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import RangeForm from './RangeForm/RangeForm';

interface Props extends WrappedComponentProps {
  value: string;
  onChange: (v: string) => {};
}

class DailyFilter extends React.PureComponent<Props> {
  onChange = (value: string) => {
    const { onChange } = this.props;
    onChange && onChange(value[0]);
  };

  render(): JSX.Element {
    const { value, intl } = this.props;
    return (
      <RangeForm/>
    );
  }
}

export default injectIntl(DailyFilter);
