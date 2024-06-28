import React, { useCallback, useEffect, useRef, useState } from 'react';

import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';

import type { DatePickerProps } from './DatePicker.types';
import RawDatePicker from './RawDatePicker/RawDatePicker';
import PickerInput from './Elements/PickerInput/PickerInput';
import * as S from './DatePicker.styles';

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
  ...rest
}: DatePickerProps) => {
  const [dropVisible, setDropVisible] = useState(autoFocus || false);
  const [selectedDate, setSelectedDate] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    !!dropVisible && setDropVisible(false);
  });

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const onValueChangeCallback = useCallback(
    (val: Date | undefined) => {
      onValueChange && onValueChange(val);
    },
    [onValueChange]
  );
  const onApplyCallback = useCallback(
    (val: Date | undefined) => {
      onApply && onApply(val);
      setSelectedDate(val);
      setDropVisible(false);
    },
    [onApply]
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
      placeholder={texts.inputPlaceholder}
      prefixel={prefixel}
      suffixel={suffixel}
      clearTooltip={texts.clearTooltip}
      highlight={!!dropVisible && !disabled}
      error={error}
      errorText={errorText}
      readOnly={readOnly}
    />
  );

  return readOnly ? (
    trigger
  ) : (
    <Dropdown
      overlay={
        <S.OverlayContainer ref={ref}>
          <RawDatePicker
            {...rest}
            showTime={showTime}
            texts={texts}
            onApply={onApplyCallback}
            onValueChange={onValueChangeCallback}
            value={selectedDate}
            hideNow={hideNow}
          />
        </S.OverlayContainer>
      }
      overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(35, 41, 54, 0.07)' }}
      onVisibleChange={onDropdownVisibleChange}
      trigger={['click']}
      placement={popoverPlacement}
      visible={!!dropVisible && !disabled}
      disabled={disabled}
      {...dropdownProps}
    >
      {trigger}
    </Dropdown>
  );
};
export default DatePicker;
