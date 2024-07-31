import React, { useCallback, useMemo, useState, MouseEvent } from 'react';

import Icon, { CalendarM, Close3S } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { getDefaultDataTimeOptions, useDataFormat } from '@synerise/ds-data-format';

import { legacyParse } from '@date-fns/upgrade/v2';
import { PickerInputProps } from './PickerInput.types';
import * as S from './PickerInput.styles';
import format from '../../format';

const PickerInput = <ValueType extends Date | string = Date>({
  autoFocus,
  size,
  disabled,
  readOnly,
  value,
  format: dateFormat,
  valueFormatOptions,
  onChange,
  showTime,
  placeholder,
  onClear,
  onClick,
  clearTooltip,
  highlight,
  error,
  errorText,
  prefixel,
  suffixel,
  allowClear,
  ...rest
}: PickerInputProps<ValueType>) => {
  const { formatValue } = useDataFormat();

  const [hovered, setHovered] = useState(false);

  const getText = useCallback(() => {
    if (!value) return '';
    if (dateFormat) {
      return format(legacyParse(value), dateFormat);
    }
    if (typeof value === 'string') {
      return format(legacyParse(value), dateFormat || showTime ? 'MMM d, yyyy, HH:mm' : 'MMM d, yyyy');
    }
    return formatValue(value, { ...getDefaultDataTimeOptions(showTime), ...valueFormatOptions });
  }, [value, dateFormat, showTime, formatValue, valueFormatOptions]);

  const handleApply = useCallback(
    (date?: Date | null) => {
      if (!onChange) return;
      onChange(date, getText());
    },
    [onChange, getText]
  );

  const handleIconClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onClear && onClear();
      handleApply(null);
    },
    [onClear, handleApply]
  );

  const handleInputClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onClick && onClick();
    },
    [onClick]
  );

  const iconInput = useMemo(
    () =>
      (hovered || highlight) && allowClear && !readOnly && !!value ? (
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
    [hovered, highlight, allowClear, readOnly, value, clearTooltip, handleIconClick]
  );

  return (
    <S.PickerInputWrapper prefixel={!!prefixel} suffixel={!!suffixel} className="ds-date-input">
      {!!prefixel && <S.Prefixel>{prefixel}</S.Prefixel>}
      <S.Container
        onMouseEnter={!disabled ? () => setHovered(true) : undefined}
        onMouseLeave={!disabled ? () => setHovered(false) : undefined}
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
