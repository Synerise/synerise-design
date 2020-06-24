import * as React from 'react';
import * as moment from 'moment';

import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';

import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { CalendarM } from '@synerise/ds-icon/dist/icons';
import { getPopupContainer } from '../../utils';
import { Props, State } from './PickerInput.types';
import { Container, Popover, InputWrapper} from './PickerInput.styles';

class PickerInput extends React.Component<Props, State> {
  static defaultProps = {
    allowClear: true,
  };

  state = {
    visible: false,
  };

  handleVisibleChange = (visible: boolean): void => {
    const activeElement = document.activeElement as HTMLElement;
    activeElement && activeElement.blur();
    this.setState({ visible });
  };

  handleClear = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    this.handleApply(null);
  };

  handleApply = (value?: Date | null): void => {
    const { onChange } = this.props;
    if (!onChange) return;
    this.handleVisibleChange(false);
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
    const {
      disabledDate,
      onChange,
      allowClear,
      style,
      size,
      disabled,
      placeholder,
      content: ContentComponent,
      ...rest
    } = this.props;
    let { value } = this.props;
    const { visible } = this.state;
    if (typeof value === 'string') value = moment(value);
    const input = (
      <InputWrapper style={style}>
        <Input
          resetMargin
          readOnly
          type="text"
          size={size as SizeType}
          disabled={disabled}
          value={this.getText() || placeholder}
          icon1={<Icon component={<CalendarM />} />}
        />
      </InputWrapper>
    );
    if (disabled) return input;

    return (
      <Container>
        <Popover
          content={
            <ContentComponent
              {...rest}
              key={visible ? 1 : 0}
              value={value ? value.toDate() : undefined}
              onApply={this.handleApply}
              dateValidator={disabledDate ? this.disabledDate : undefined}
            />
          }
          getPopupContainer={getPopupContainer}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={visible}
          placement="bottomRight"
        >
          {input}
        </Popover>
      </Container>
    );
  }
}

export default PickerInput;
