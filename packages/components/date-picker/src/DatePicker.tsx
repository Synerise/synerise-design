import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import Dropdown from '@synerise/ds-dropdown';

import { TRIGGER_PROPS } from './DatePicker.const';
import * as S from './DatePicker.styles';
import type { DatePickerProps } from './DatePicker.types';
import PickerInput from './Elements/PickerInput/PickerInput';
import RawDatePicker from './RawDatePicker/RawDatePicker';
import { getDefaultTexts } from './utils/getDefaultTexts';

const DatePicker = ({
  autoFocus,
  disabled,
  texts,
  format,
  valueFormatOptions,
  value,
  onApply,
  showTime,
  onValueChange,
  onClear,
  errorText,
  popoverPlacement,
  prefixel,
  error,
  onDropdownVisibleChange,
  dropdownProps,
  suffixel,
  hideNow,
  readOnly,
  renderTrigger,
  inputProps,
  allowClear = true,
  overlayHTMLAttributes,
  triggerHTMLAttributes,
  ...rest
}: DatePickerProps) => {
  const [dropVisible, setDropVisible] = useState(autoFocus || false);
  const [selectedDate, setSelectedDate] = useState(value);

  const intl = useIntl();
  const allTexts = getDefaultTexts(intl, texts);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const onValueChangeCallback = useCallback(
    (val: Date | undefined) => {
      onValueChange && onValueChange(val);
    },
    [onValueChange],
  );
  const onApplyCallback = useCallback(
    (val: Date | undefined) => {
      onApply && onApply(val);
      setSelectedDate(val);
      setDropVisible(false);
    },
    [onApply],
  );

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      onDropdownVisibleChange?.(newOpen);
      dropdownProps?.onOpenChange?.(newOpen);
      setDropVisible(newOpen);
    },
    [dropdownProps, onDropdownVisibleChange],
  );

  const handleClear = useCallback(() => {
    setDropVisible(false);
    setSelectedDate(undefined);
    onClear && onClear();
  }, [onClear]);

  const trigger = renderTrigger?.() || (
    <PickerInput
      {...inputProps}
      disabled={disabled}
      allowClear={allowClear}
      autoFocus={!disabled && autoFocus}
      value={selectedDate}
      showTime={showTime}
      onClick={
        !readOnly
          ? () => {
              setDropVisible(!dropVisible);
            }
          : undefined
      }
      format={format}
      valueFormatOptions={valueFormatOptions}
      onClear={handleClear}
      placeholder={allTexts.inputPlaceholder}
      prefixel={prefixel}
      suffixel={suffixel}
      clearTooltip={allTexts.clearTooltip}
      highlight={!!dropVisible && !disabled}
      error={error}
      errorText={errorText}
      readOnly={readOnly}
      triggerHTMLAttributes={triggerHTMLAttributes}
    />
  );

  return readOnly ? (
    trigger
  ) : (
    <Dropdown
      overlay={
        <S.OverlayContainer
          data-testid="date-picker-overlay-container"
          {...overlayHTMLAttributes}
        >
          <RawDatePicker
            {...rest}
            showTime={showTime}
            texts={allTexts}
            onApply={onApplyCallback}
            onValueChange={onValueChangeCallback}
            value={selectedDate}
            hideNow={hideNow}
          />
        </S.OverlayContainer>
      }
      trigger={['click']}
      placement={popoverPlacement}
      disabled={disabled}
      size="min-match-trigger"
      asChild={false}
      {...dropdownProps}
      onOpenChange={handleOpenChange}
      open={(dropVisible || dropdownProps?.open) && !disabled}
      popoverProps={{
        testId: 'date-picker',
        ...dropdownProps?.popoverProps,
      }}
      popoverTriggerProps={{
        ...TRIGGER_PROPS,
        ...dropdownProps?.popoverTriggerProps,
      }}
    >
      {trigger}
    </Dropdown>
  );
};
export default DatePicker;
