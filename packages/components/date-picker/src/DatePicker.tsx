import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';
import { Props } from './DatePicker.types';
import RawDatePicker from './RawDatePicker/RawDatePicker';
import PickerInput from './Elements/PickerInput/PickerInput';
import * as S from './DatePicker.styles';

const DatePicker: React.FC<Props> = ({
  autoFocus,
  texts,
  format,
  value,
  onApply,
  showTime,
  onValueChange,
  onClear,
  errorText,
  popoverPlacement,
  error,
  onDropdownVisibleChange,
  dropdownProps,
  ...rest
}) => {
  const [dropVisible, setDropVisible] = React.useState(autoFocus || false);
  const [selectedDate, setSelectedDate] = React.useState(value);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    !!dropVisible && setDropVisible(false);
  });
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
  return (
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
          />
        </S.OverlayContainer>
      }
      overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(35, 41, 54, 0.07)' }}
      onVisibleChange={onDropdownVisibleChange}
      trigger={['click']}
      placement={popoverPlacement}
      visible={!!dropVisible}
      {...dropdownProps}
    >
      <PickerInput
        autoFocus={autoFocus}
        value={selectedDate}
        showTime={showTime}
        onClick={(): void => {
          setDropVisible(!dropVisible);
        }}
        format={format}
        onClear={(): void => {
          setDropVisible(false);
          setSelectedDate(undefined);
          onClear && onClear();
        }}
        placeholder={texts.inputPlaceholder}
        clearTooltip={texts.clearTooltip}
        highlight={!!dropVisible}
        error={error}
        errorText={errorText}
      />
    </Dropdown>
  );
};
export default DatePicker;
