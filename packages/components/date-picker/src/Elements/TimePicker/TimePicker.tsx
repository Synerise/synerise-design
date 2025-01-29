import React from 'react';

import { useDataFormat, getDefaultDataTimeOptions } from '@synerise/ds-data-format';
import DSTimePicker from '@synerise/ds-time-picker';

import Navbar from '../Navbar/Navbar';
import * as S from './TimePicker.styles';
import { TimePickerProps } from './TimePicker.types';

const TimePicker = ({
  value = new Date(),
  disabledHours = [],
  disabledMinutes = [],
  disabledSeconds = [],
  inactivePrev,
  inactiveNext,
  onChange,
  onShortNext,
  onShortPrev,
}: TimePickerProps) => {
  const { is12HoursClock, formatValue } = useDataFormat();
  const navbarDate = formatValue(value, { ...getDefaultDataTimeOptions(), targetFormat: 'date', month: 'short' });

  return (
    <>
      {!!value && (
        <Navbar
          title={navbarDate}
          key="head"
          inactivePrev={inactivePrev}
          inactiveNext={inactiveNext}
          onShortNext={onShortNext}
          onShortPrev={onShortPrev}
        />
      )}
      <S.Container key="ds-time-picker-body" className="ds-time-picker">
        <DSTimePicker
          value={value}
          onChange={onChange}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          use12HourClock={is12HoursClock}
          raw
        />
      </S.Container>
    </>
  );
};

export default TimePicker;
