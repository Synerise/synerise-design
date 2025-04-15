import React, { useCallback, useMemo, useState, MouseEvent } from 'react';

import Icon, { ArrowRightS, CalendarM, Close3S } from '@synerise/ds-icon';
import { useTheme } from '@synerise/ds-core';
import Tooltip from '@synerise/ds-tooltip';
import { getDefaultDataTimeOptions, useDataFormat } from '@synerise/ds-data-format';
import FormField from '@synerise/ds-form-field';

import { RangePickerInputProps } from './RangePickerInput.types';
import * as S from './RangePickerInput.styles';

import { normalizeRange } from '../utils';
import type { DateRange, NullableDateLimit } from '../date.types';
import { isLifetime } from '../RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';

const RangePickerInput = ({
  value,
  valueFormatOptions,
  showTime,
  onChange,
  onClick,
  highlight,
  texts,
  active,
  label,
  description,
  tooltip,
  tooltipConfig,
  disabled,
  readOnly,
  onFocus,
  allowClear = true,
  onBlur,
  error,
  errorText,
  preferRelativeDesc = false,
}: RangePickerInputProps) => {
  const theme = useTheme();
  const { formatValue } = useDataFormat();

  const dateRangeValue = value ? normalizeRange(value as DateRange) : value;
  const [hovered, setHovered] = useState(false);
  const showError = error || !!errorText;
  const hasValue = dateRangeValue?.from && dateRangeValue?.to;

  const handleIconMouseEnter = useCallback(() => setHovered(true), []);
  const handleIconMouseLeave = useCallback(() => setHovered(false), []);

  const handleClear = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      onChange && onChange(undefined);
    },
    [onChange]
  );

  const getText = useCallback(
    (dateToDisplay?: NullableDateLimit): string => {
      const dateValue = dateToDisplay ? new Date(dateToDisplay) : new Date();
      return formatValue(dateValue, { ...getDefaultDataTimeOptions(showTime), ...valueFormatOptions });
    },
    [showTime, formatValue, valueFormatOptions]
  );

  const renderFromDate = useCallback(() => {
    const isFromDateDefined = dateRangeValue && dateRangeValue.from;
    const text =
      dateRangeValue && isFromDateDefined ? (
        <S.DateValue>{getText(dateRangeValue.from)}</S.DateValue>
      ) : (
        texts?.startDatePlaceholder
      );
    return <S.DateWrapper highlight={active && !disabled && !isFromDateDefined && highlight}>{text}</S.DateWrapper>;
  }, [dateRangeValue, getText, active, disabled, texts, highlight]);

  const renderEndDate = useCallback(() => {
    const isEndDateDefined = dateRangeValue && dateRangeValue.to;
    const isFromDateDefined = dateRangeValue && dateRangeValue.from;

    const text =
      isEndDateDefined && dateRangeValue ? (
        <S.DateValue>{getText(dateRangeValue.to)}</S.DateValue>
      ) : (
        texts?.endDatePlaceholder
      );
    return (
      <S.DateWrapper highlight={active && !!isFromDateDefined && !isEndDateDefined && highlight}>{text}</S.DateWrapper>
    );
  }, [dateRangeValue, getText, active, texts, highlight]);

  const placeholder = useMemo(() => {
    if (isLifetime(value as typeof dateRangeValue)) {
      return <>{texts?.allTime || 'Lifetime'}</>;
    }
    return (
      <>
        {preferRelativeDesc &&
          dateRangeValue?.translationKey &&
          `${texts?.[dateRangeValue.translationKey] || dateRangeValue?.translationKey} (`}
        {renderFromDate()}
        <Icon component={<ArrowRightS />} color={theme.palette['grey-400']} />
        {renderEndDate()}
        {preferRelativeDesc && dateRangeValue?.translationKey && value && ')'}
      </>
    );
  }, [value, preferRelativeDesc, dateRangeValue?.translationKey, texts, renderFromDate, theme.palette, renderEndDate]);

  return (
    <>
      <FormField
        errorText={errorText}
        label={label}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
        description={description}
      >
        <S.Container
          tabIndex={0}
          onFocus={onFocus}
          onClick={!disabled ? onClick : undefined}
          onBlur={onBlur}
          data-testid="date-range-picker-input-wrapper"
          onMouseEnter={handleIconMouseEnter}
          onMouseLeave={handleIconMouseLeave}
        >
          <S.RangeInputWrapper
            error={showError}
            disabled={disabled}
            active={!!highlight && !disabled}
            tabIndex={disabled ? -1 : 0}
            focus={active && !disabled}
          >
            {placeholder}
            <S.IconSeparator />
            {!readOnly && !disabled && hovered && hasValue && allowClear ? (
              <Tooltip title={texts?.clear}>
                <S.ClearIconWrapper>
                  <Icon component={<Close3S />} data-testid="date-range-picker-input-clear" onClick={handleClear} />
                </S.ClearIconWrapper>
              </Tooltip>
            ) : (
              <S.DefaultIconWrapper>
                <Icon component={<CalendarM />} color={theme.palette['grey-600']} />
              </S.DefaultIconWrapper>
            )}
          </S.RangeInputWrapper>
        </S.Container>
      </FormField>
    </>
  );
};

export default RangePickerInput;
