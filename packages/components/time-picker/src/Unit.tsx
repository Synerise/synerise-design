import * as React from 'react';
import dayjs from 'dayjs';

import * as S from './TimePicker.styles';

export type UnitConfig = {
  unit: dayjs.UnitType;
  options: number[];
  disabled?: number[];
  insertSeperator?: boolean;
};

export type UnitProps = UnitConfig & {
  value?: Date;
  onSelect: (value: number) => void;
};

const Unit: React.FC<UnitProps> = ({ options, disabled, value, unit, onSelect }) => {
  const selected = value && dayjs(value).get(unit);

  return (
    <S.Unit data-testid={`ds-time-picker-unit-${unit}`}>
      {options.map((option: number) => {
        const normalizedStringValue = option < 10 ? `0${option}` : option.toString();
        const isDisabled = disabled && disabled.includes(option);

        return (
          <S.Cell
            key={option}
            disabled={isDisabled}
            onClick={(): void => onSelect(option)}
            active={selected === option}
          >
            <S.CellText>{normalizedStringValue}</S.CellText>
          </S.Cell>
        );
      })}
    </S.Unit>
  );
};

export default Unit;
