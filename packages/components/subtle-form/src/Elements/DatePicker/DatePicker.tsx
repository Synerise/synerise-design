import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  getDefaultDataTimeOptions,
  useDataFormat,
  useTheme,
} from '@synerise/ds-core';
import { DatePicker } from '@synerise/ds-date-picker';
import Icon, { CalendarM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from '../../SubtleForm.styles';
import { MaskedDatePlaceholder, SelectContainer } from './DatePicker.styles';
import { type SubtleDatePickerProps } from './DatePicker.types';
import { replaceLettersWithUnderscore } from './utils';

const SubtleDatePicker = ({
  value,
  suffix = true,
  suffixTooltip,
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
  const { formatValue } = useDataFormat();
  const hasError = error || !!errorText;
  const { showTime, valueFormatOptions } = rest;

  // The same options ds-date-picker's own input uses, so the value reads identically whether the
  // field is being edited or merely displayed. This used to be a hardcoded `dd-MM-yyyy` token
  // pattern, which disagreed with the picker for every locale — `08-09-2026` against `8 Sept 2026`.
  const displayOptions = useMemo(
    () => ({ ...getDefaultDataTimeOptions(showTime), ...valueFormatOptions }),
    [showTime, valueFormatOptions],
  );

  const formatDisplayValue = useCallback(
    (val: Date) => (val ? formatValue(val, displayOptions) : ''),
    [formatValue, displayOptions],
  );

  const getDisplayText = useCallback((): string | undefined => {
    return value && !!String(value).trim()
      ? formatDisplayValue(value as Date)
      : placeholder;
  }, [value, placeholder, formatDisplayValue]);

  // The mask mirrors the shape of a real formatted date rather than a token pattern, so it stays
  // in step with whatever the data-format config produces.
  const maskSample = useMemo(
    () => formatDisplayValue(new Date(2026, 10, 22, 22, 22)),
    [formatDisplayValue],
  );

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
      <S.SubtleFormField
        $active={active || hasError}
        label={label}
        tooltip={labelTooltip}
      >
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
              onDropdownVisibleChange={(visible: boolean): void => {
                setActive(visible);
                setBlurred(!visible);
                onDropdownVisibleChange && onDropdownVisibleChange(visible);
              }}
            />
          ) : (
            <S.Inactive
              $disabled={disabled}
              onClick={!disabled ? handleActivate : undefined}
              $blurred={blurred}
              $mask={!value}
            >
              <S.MainContent hasMargin>
                {getDisplayText()}
                {!disabled && (
                  <MaskedDatePlaceholder>
                    {replaceLettersWithUnderscore(maskSample)}
                  </MaskedDatePlaceholder>
                )}
              </S.MainContent>

              {!active && suffix && (
                <S.Suffix select>
                  <Tooltip title={suffixTooltip}>
                    <Icon
                      component={<CalendarM />}
                      color={theme.palette['grey-600']}
                    />
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
SubtleDatePicker.displayName = 'SubtleDatePicker';
export default SubtleDatePicker;
