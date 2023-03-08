import * as React from 'react';

import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';

import { Props } from './DatePicker.types';
import RawDatePicker from './RawDatePicker/RawDatePicker';
import PickerInput from './Elements/PickerInput/PickerInput';
import * as S from './DatePicker.styles';

const DatePicker: React.FC<Props> = ({
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
  ...rest
}) => {
  const [dropVisible, setDropVisible] = React.useState(autoFocus || false);
  const [selectedDate, setSelectedDate] = React.useState(value);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    !!dropVisible && setDropVisible(false);
  });

  React.useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const onValueChangeCallback = React.useCallback(
    (val: Date | undefined): void => {
      onValueChange && onValueChange(val);
      setSelectedDate(val);
    },
    [onValueChange]
  );
  const onApplyCallback = React.useCallback(
    (val: Date | undefined): void => {
      onApply && onApply(val);
      setSelectedDate(val);
      setDropVisible(false);
    },
    [onApply]
  );

  const handleClear = React.useCallback((): void => {
    setDropVisible(false);
    setSelectedDate(undefined);
    onClear && onClear();
  }, [onClear]);

  const trigger = (
    <PickerInput
      disabled={disabled}
      autoFocus={!disabled && autoFocus}
      value={selectedDate}
      showTime={showTime}
      onClick={
        !readOnly
          ? (): void => {
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
