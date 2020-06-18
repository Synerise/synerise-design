import * as React from 'react';
import * as moment from 'moment';

import { getPopupContainer } from '@synerise/ds-utils';
import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';

import { Moment } from 'moment';
import { Props, State } from './PickerInput.types';
import { Container, Popover, InputWrapper, Pair, IconWrapper } from './PickerInput.styles';

class PickerInput extends React.Component<Props, State> {

  static defaultProps = {
    allowClear: true,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  handleVisibleChange = (visible: boolean) => {
    document.activeElement && document.activeElement.blur();
    this.setState({ visible });
  };

  handleClear = (e: MouseEvent): void => {
    e.stopPropagation();
    this.handleApply(null);
  };

  handleApply = (value?: Date | null): void => {
    const { onChange } = this.props;
    if (!onChange) return;
    this.handleVisibleChange(false);
    onChange(value ? moment(value) : null, this.getText());
  };

  getText = (): Moment | string => {
    const { showTime, format } = this.props;
    let { value } = this.props;
    if (!value) return '';
    if (typeof value === 'string') value = moment(value);

    return value.format(format || showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');
  };

  disabledDate = (day: Date): boolean => {
    const { disabledDate } = this.props;
    if (disabledDate) return disabledDate(moment(day));
    return false;
  };

  render() {
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
    if (typeof value === 'string') value = moment(value);
    const input = (
      <InputWrapper style={style}>
        <Input resetMargin readOnly type="text" size={size} disabled={disabled} value={this.getText() || placeholder} />
        <IconWrapper>
          {allowClear && value && !disabled ? (
            <Pair onClick={this.handleClear}>
              <Icon name="calendar-m" />
              <Icon name="clear-s" />
            </Pair>
          ) : (
            <Icon name="calendar-m" />
          )}
        </IconWrapper>
      </InputWrapper>
    );
    if (disabled) return input;
    return (
      <Container>
        <Popover
          content={
            <ContentComponent
              {...rest}
              key={this.state.visible ? 1 : 0}
              value={value ? value.toDate() : null}
              onApply={this.handleApply}
              disabledDate={disabledDate ? this.disabledDate : undefined}
            />
          }
          getPopupContainer={getPopupContainer}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
          placement="bottomRight"
        >
          {input}
        </Popover>
      </Container>
    );
  }
}

export default PickerInput;
