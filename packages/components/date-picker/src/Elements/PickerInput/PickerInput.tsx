import * as React from 'react';
import * as moment from 'moment';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { CalendarM, Close3S } from '@synerise/ds-icon/dist/icons';
import { Props } from './PickerInput.types';
import * as S from './PickerInput.styles';

const PickerInput: React.FC<Props> = ({
  size,
  disabled,
  value,
  format,
  onChange,
  showTime,
  style,
  placeholder,
  onClear,
  onClick,
  clearTooltip,
  highlight,
  error,
  errorText,
  ...rest
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);

  const getText = React.useCallback((): string => {
    if (!value) return '';
    let dateValue = value;
    if (typeof value === 'string') dateValue = moment(value);
    return dateValue.format(format || showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');
  }, [value, format, showTime]);

  const handleApply = React.useCallback(
    (date?: Date | null): void => {
      if (!onChange) return;
      onChange(date ? moment(date) : null, getText());
    },
    [onChange, getText]
  );

  const handleIconClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation();
      onClear && onClear();
      handleApply(null);
    },
    [onClear, handleApply]
  );

  const handleInputClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation();
      onClick && onClick();
    },
    [onClick]
  );
  return (
    <S.Container
      onMouseEnter={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
      onClick={handleInputClick}
    >
      <S.Input
        active={!!highlight}
        resetMargin
        readOnly
        type="text"
        size={size as SizeType}
        disabled={disabled}
        placeholder={placeholder}
        value={getText()}
        icon1={
          hovered && !!value ? (
            <S.ClearIconWrapper>
              <Tooltip title={clearTooltip}>
                <Icon component={<Close3S />} onClick={handleIconClick} />
              </Tooltip>
            </S.ClearIconWrapper>
          ) : (
            <S.DefaultIconWrapper>
              <Icon component={<CalendarM />} />
            </S.DefaultIconWrapper>
          )
        }
        style={style}
        error={error}
        errorText={errorText}
        {...rest}
      />
    </S.Container>
  );
};

export default PickerInput;
