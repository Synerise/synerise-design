import * as React from 'react';
import { useIntl } from 'react-intl';

import { useDataFormat } from '@synerise/ds-data-format';

import fnsFormat from '../../format';
import Navbar from '../Navbar/Navbar';
import * as S from './TimePicker.styles';
import { TimePickerProps } from './TimePicker.types';

const TimePicker: React.FC<TimePickerProps> = ({
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
  const intl = useIntl();

  const { is12HoursClock } = useDataFormat();

  return (
    <>
      {!!value && (
        <Navbar
          title={fnsFormat(value, 'iii d, yyyy', intl.locale)}
          key="head"
          inactivePrev={inactivePrev}
          inactiveNext={inactiveNext}
          onShortNext={onShortNext}
          onShortPrev={onShortPrev}
        />
      )}
      <S.Container key="ds-time-picker-body" className="ds-time-picker">
        <S.Picker
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
