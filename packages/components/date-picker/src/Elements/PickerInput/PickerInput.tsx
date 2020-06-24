import * as React from 'react';
import * as moment from 'moment';

import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';

import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { CalendarM } from '@synerise/ds-icon/dist/icons';
import { Props, State } from './PickerInput.types';

class PickerInput extends React.Component<Props, State> {
  static defaultProps = {
    allowClear: true,
  };

  handleClear = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    this.handleApply(null);
  };

  handleApply = (value?: Date | null): void => {
    const { onChange } = this.props;
    if (!onChange) return;
    onChange(value ? moment(value) : null, this.getText());
  };

  getText = (): string => {
    const { showTime, format } = this.props;
    let { value } = this.props;
    if (!value) return '';
    if (typeof value === 'string') value = moment(value);

    return value.format(format || showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');
  };

  disabledDate = (day: Date | undefined): boolean => {
    const { disabledDate } = this.props;
    if (disabledDate) return disabledDate(moment(day));
    return false;
  };

  render(): React.ReactNode {
    const { size, disabled, placeholder } = this.props;
    let { value } = this.props;
    if (typeof value === 'string') value = moment(value);
    return (
      <Input
        resetMargin
        readOnly
        type="text"
        size={size as SizeType}
        disabled={disabled}
        value={this.getText() || placeholder}
        icon1={<Icon component={<CalendarM />} />}
      />
    );
  }
}

export default PickerInput;
