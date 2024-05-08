import * as React from 'react';

import Icon, { CalendarM, Close3S } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { getDefaultDataTimeOptions, useDataFormat } from '@synerise/ds-data-format';

import { legacyParse } from '@date-fns/upgrade/v2';
import { PickerInputProps } from './PickerInput.types';
import * as S from './PickerInput.styles';
import format from '../../format';

const PickerInput = ({
  autoFocus,
  size,
  disabled,
  readOnly,
  value,
  format: dateFormat,
  valueFormatOptions,
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
  prefixel,
  suffixel,
  ...rest
}: PickerInputProps) => {
  const { formatValue } = useDataFormat();

  const [hovered, setHovered] = React.useState<boolean>(false);

  const getText = React.useCallback((): string => {
    if (!value) return '';
    if (dateFormat) {
      return format(legacyParse(value), dateFormat);
    }
    if (typeof value === 'string') {
      return format(legacyParse(value), dateFormat || showTime ? 'MMM d, yyyy, HH:mm' : 'MMM d, yyyy');
    }
    return formatValue(value, { ...getDefaultDataTimeOptions(showTime), ...valueFormatOptions });
  }, [value, dateFormat, showTime, formatValue, valueFormatOptions]);

  const handleApply = React.useCallback(
    (date?: Date | null): void => {
      if (!onChange) return;
      onChange(date, getText());
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

  const iconInput = React.useMemo(
    () =>
      (hovered || highlight) && !readOnly && !!value ? (
        <S.ClearIconWrapper>
          <Tooltip title={clearTooltip}>
            <Icon component={<Close3S />} onClick={handleIconClick} />
          </Tooltip>
        </S.ClearIconWrapper>
      ) : (
        <S.DefaultIconWrapper>
          <Icon component={<CalendarM />} />
        </S.DefaultIconWrapper>
      ),
    [hovered, value, readOnly, clearTooltip, handleIconClick, highlight]
  );
  return (
    <S.PickerInputWrapper prefixel={!!prefixel} suffixel={!!suffixel} className="ds-date-input">
      {!!prefixel && <S.Prefixel>{prefixel}</S.Prefixel>}
      <S.Container
        onMouseEnter={!disabled ? (): void => setHovered(true) : undefined}
        onMouseLeave={!disabled ? (): void => setHovered(false) : undefined}
        onClick={!disabled ? handleInputClick : undefined}
      >
        <S.Input
          autoFocus={autoFocus}
          active={!!highlight}
          resetMargin
          readOnly={readOnly}
          type="text"
          size={size}
          disabled={disabled}
          placeholder={placeholder}
          value={getText()}
          icon1={iconInput}
          style={style}
          error={error}
          errorText={errorText}
          {...rest}
        />
      </S.Container>
      {!!suffixel && <S.Suffixel>{suffixel}</S.Suffixel>}
    </S.PickerInputWrapper>
  );
};

export default PickerInput;
