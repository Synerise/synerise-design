import styled from 'styled-components';
import TimePicker from '@synerise/ds-time-picker';
import { TimePickerProps } from '@synerise/ds-time-picker/dist/TimePicker';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  
`;
export const RangeSelect = styled.div`
  width: 20%;
`;
export const TimePickerWrapper = styled.div`
  width: 40%;
  display:flex;
  justify-content: center;
`;
export const Picker = styled(TimePicker)<TimePickerProps>`
  width: 100%;
  flex:1;
`;
