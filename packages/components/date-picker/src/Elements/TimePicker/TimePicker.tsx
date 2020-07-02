import * as React from 'react';
import fnsFormat from '../../format';

import Navbar from '../Navbar/Navbar';
import * as S from './TimePicker.styles';
import { TimePickerProps } from './TimePicker.types';

const TimePicker: React.FC<TimePickerProps> = ({
  value = new Date(),
  disabledHours = [],
  disabledMinutes = [],
  disabledSeconds = [],
  onChange,
  onShortNext,
  onShortPrev,
}: TimePickerProps) => {
  return (
    <>
      <Navbar title={fnsFormat(value, 'ddd D, YYYY')} key="head" onShortNext={onShortNext} onShortPrev={onShortPrev} />
      <S.Container key="body" className="ds-time-picker">
        <S.Picker
          value={value}
          onChange={onChange}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          raw
        />
      </S.Container>
    </>
  );
};

export default TimePicker;
