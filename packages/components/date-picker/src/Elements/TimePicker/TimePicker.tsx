import * as React from 'react';
import DSTimePicker from '@synerise/ds-time-picker/dist/TimePicker';
import fnsFormat from '../../format';

import Navbar from '../Navbar/Navbar';
import { Container } from './TimePicker.styles';
import { TimePickerProps } from './TimePicker.types';
import { range } from '../../utils';

export const TIME_OPTIONS = {
  HOURS: range(0, 24),
  MINUTES: range(0, 60),
  SECONDS: range(0, 60),
};

const TimePicker: React.FC<TimePickerProps> = ({
  value = new Date(),
  disabledHours = [],
  disabledMinutes = [],
  disabledSeconds = [],
  onChange,
}: TimePickerProps) => {
  return (
    <>
      <Navbar title={fnsFormat(value, 'ddd D, YYYY')} key="head" />
      <Container key="body">
        <DSTimePicker
          value={value}
          onChange={onChange}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          raw
        />
      </Container>
    </>
  );
};

export default TimePicker;
