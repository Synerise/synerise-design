import * as React from 'react';
import * as moment from 'moment';

import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';

import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { CalendarM, Close3M } from '@synerise/ds-icon/dist/icons';
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
  ...rest
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);

  const getText = (): string => {
    if (!value) return '';
    let dateValue = value;
    if (typeof value === 'string') dateValue = moment(value);
    return dateValue.format(format || showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');
  };

  const handleApply = (date?: Date | null): void => {
    if (!onChange) return;
    onChange(date ? moment(date) : null, getText());
  };

  const handleIconClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation();
      onClear && onClear();
      handleApply(null);
    },
    [onClear]
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
      <Input
        resetMargin
        readOnly
        type="text"
        size={size as SizeType}
        disabled={disabled}
        value={getText() || placeholder}
        icon1={
          (hovered && !!value) ? (
            <S.ClearIconWrapper>
              <Icon component={<Close3M />} onClick={handleIconClick} />
            </S.ClearIconWrapper>
          ) : (
            <Icon component={<CalendarM />} />
          )
        }
        style={style}
        {...rest}
      />
    </S.Container>
  );
};

export default PickerInput;
