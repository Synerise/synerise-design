import React from 'react';
import { useIntl } from 'react-intl';

import {
  applyTimezoneOffset,
  getDefaultDataTimeOptions,
  useDataFormat,
} from '@synerise/ds-core';
import DSTimePicker from '@synerise/ds-time-picker';

import Navbar from '../Navbar/Navbar';
import * as S from './TimePicker.styles';
import type { TimePickerProps } from './TimePicker.types';

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
  timeZone,
}: TimePickerProps) => {
  const { is12HoursClock, formatValue } = useDataFormat();
  const intl = useIntl();

  const valueInTimezone =
    timeZone && applyTimezoneOffset(value, timeZone, intl);
  const localisedDate1 = valueInTimezone ? new Date(valueInTimezone) : value;

  // `localisedDate1` is a real instant re-anchored in the timezone resolved above.
  // formatValue only projects an instant into the provider timezone when
  // `applyTimeZoneOffset` is set, and that defaults to `false` in DataFormatConfig —
  // force it here instead of inheriting it, or the navbar date drifts by the
  // browser-to-provider timezone delta.
  const navbarDate = formatValue(localisedDate1, {
    ...getDefaultDataTimeOptions(),
    targetFormat: 'date',
    month: 'short',
    ...(valueInTimezone && intl.timeZone ? { applyTimeZoneOffset: true } : {}),
  });
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
