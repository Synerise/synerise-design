import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon, { CalendarM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { useTheme } from '@synerise/ds-core';
import DatePicker from '@synerise/ds-date-picker';
import format from '@synerise/ds-date-picker/dist/format';
import * as S from '../../SubtleForm.styles';
import { SelectContainer, MaskedDatePlaceholder } from './DatePicker.styles';
import { SubtleDatePickerProps } from './DatePicker.types';
import { getFormattingString, replaceLettersWithUnderscore } from './utils';

const SubtleDatePicker = ({
  value,
  suffix,
  suffixTooltip,
  format: dateFormat,
  label,
  children,
  labelTooltip,
  placeholder,
  onApply,
  onClear,
  errorText,
  error,
  activeProp,
  onDropdownVisibleChange,
  disabled,
  ...rest
}: SubtleDatePickerProps) => {
  const [active, setActive] = useState(false);
  const [blurred, setBlurred] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const hasError = error || !!errorText;
  const { showTime } = rest;
  const dateFormattingString = useMemo(() => getFormattingString(dateFormat, showTime), [dateFormat, showTime]);
  const formatValue = useCallback(
    (val: Date) => {
      if (!val) return '';
      return format(val, dateFormattingString);
    },
    [dateFormattingString]
  );
  const getDisplayText = useCallback((): string | undefined => {
    return value && !!String(value).trim() ? formatValue(value) : placeholder;
  }, [value, placeholder, formatValue]);

  useEffect(() => {
    if (error) {
      setActive(false);
      setBlurred(true);
    }
  }, [error, errorText]);
  const handleActivate = useCallback((): void => {
    setActive(true);
    setBlurred(false);
  }, []);

  const handleDeactivate = useCallback((): void => {
    setActive(false);
    setBlurred(true);
  }, []);

  return (
    <S.Subtle className="ds-subtle-form">
      <S.SubtleFormField active={active || hasError} label={label} tooltip={labelTooltip}>
        <SelectContainer
          disabled={!!disabled}
          ref={containerRef}
          className="ds-subtle-date-picker"
          active={active || hasError}
        >
          {(active && !blurred) || hasError ? (
            <DatePicker
              {...rest}
              value={value}
              onApply={(date): void => {
                handleDeactivate();
                onApply && onApply(date);
              }}
              onClear={
                !disabled
                  ? (): void => {
                      handleDeactivate();
                      onClear && onClear();
                    }
                  : undefined
              }
              error={error}
              errorText={errorText}
              autoFocus={!hasError}
              format={dateFormat}
              onDropdownVisibleChange={(visible: boolean): void => {
                setActive(visible);
                setBlurred(!visible);
                onDropdownVisibleChange && onDropdownVisibleChange(visible);
              }}
            />
          ) : (
            <S.Inactive
              disabled={disabled}
              onClick={!disabled ? handleActivate : undefined}
              blurred={blurred}
              mask={!value}
            >
              <S.MainContent hasMargin>
                {getDisplayText()}
                {!disabled && (
                  <MaskedDatePlaceholder>{replaceLettersWithUnderscore(dateFormattingString)}</MaskedDatePlaceholder>
                )}
              </S.MainContent>

              {!active && (
                <S.Suffix select>
                  <Tooltip title={suffixTooltip}>
                    {suffix ?? <Icon component={<CalendarM />} color={theme.palette['grey-600']} />}
                  </Tooltip>
                </S.Suffix>
              )}
            </S.Inactive>
          )}
        </SelectContainer>
      </S.SubtleFormField>
    </S.Subtle>
  );
};
export default SubtleDatePicker;
