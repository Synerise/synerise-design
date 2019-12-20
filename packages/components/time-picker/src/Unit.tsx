import * as React from 'react';
import * as dayjs from 'dayjs';

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
    <S.Unit>
      {options.map((option: number) => {
        const normalizedValue = option + 1;
        const isDisabled = disabled && disabled.includes(normalizedValue);

        return (
          <S.Cell
            key={option}
            disabled={isDisabled}
            onClick={(): void => onSelect(normalizedValue)}
            active={selected === normalizedValue}
          >
            <S.CellText>{normalizedValue}</S.CellText>
          </S.Cell>
        );
      })}
    </S.Unit>
  );
};

export default Unit;
