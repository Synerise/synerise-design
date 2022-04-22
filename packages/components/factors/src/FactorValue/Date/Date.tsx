import * as React from 'react';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import { InputProps } from '../../Factors.types';

const DateInput: React.FC<InputProps> = ({ value, onChange, texts, opened, onDeactivate }) => {
  const changeHandler = React.useCallback(
    (date: Date | undefined) => {
      onChange(date);
    },
    [onChange]
  );

  const handleVisibleChange = React.useCallback(
    visible => {
      if (!visible) {
        onDeactivate && onDeactivate();
      }
    },
    [onDeactivate]
  );

  return (
    <DatePicker
      onApply={changeHandler}
      value={value as Date}
      showTime
      useStartOfDay
      texts={texts.datePicker}
      disabledHours={[]}
      disabledMinutes={[]}
      disabledSeconds={[]}
      autoFocus={opened}
      onDropdownVisibleChange={handleVisibleChange}
    />
  );
};

export default DateInput;
