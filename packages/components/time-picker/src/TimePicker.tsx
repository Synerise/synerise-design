import * as React from 'react';
import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';

import ClockM from '@synerise/ds-icon/dist/icons/ClockM';
import * as S from './TimePicker.styles';

export type TimePickerProps = {
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
};

const TimePicker: React.FC<TimePickerProps> = ({ placement }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const onFocus = (): void => setOpen(true);
  const onBlur = (): void => setOpen(false);

  const overlay = (
    <S.OverlayContainer>
      <S.Unit>
        <S.Cell disabled>
          <S.CellText>12</S.CellText>
        </S.Cell>
      </S.Unit>

      <S.UnitSeperator />

      <S.Unit>
        <S.Cell>
          <S.CellText>12</S.CellText>
        </S.Cell>
      </S.Unit>

      <S.UnitSeperator />

      <S.Unit>
        <S.Cell active>
          <S.CellText>12</S.CellText>
        </S.Cell>
      </S.Unit>
    </S.OverlayContainer>
  );

  return (
    <>
      <S.Container>
        <Dropdown visible={open} placement={placement} overlay={overlay}>
          <Input value="12:32:44" onFocus={onFocus} onBlur={onBlur} icon1={<Icon component={<ClockM />} size={24} />} />
        </Dropdown>
      </S.Container>
    </>
  );
};

TimePicker.defaultProps = {
  placement: 'bottomLeft',
};

export default TimePicker;
