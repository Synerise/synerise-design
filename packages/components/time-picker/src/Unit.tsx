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
  const [selected, setSelected] = React.useState(value && dayjs(value).get(unit));
  const selectedCellRef = React.useRef<HTMLButtonElement>(null);
  const unitContainerRef = React.useRef<HTMLDivElement>(null);
  const [isFirstRender, setFirstRender] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
    }
  }, [isFirstRender]);

  React.useEffect(() => {
    if (selectedCellRef.current && unitContainerRef.current) {
      const offsetToParent = selectedCellRef.current.offsetTop - unitContainerRef.current.offsetTop;
      const scrollBehaviour = isFirstRender ? 'auto' : 'smooth';
      unitContainerRef.current.scrollTo({ top: offsetToParent, behavior: scrollBehaviour });
    }
  }, [selectedCellRef, selectedCellRef.current, unitContainerRef, unitContainerRef.current, selected]);

  return (
    <S.Unit data-testid={`ds-time-picker-unit-${unit}`} ref={unitContainerRef}>
      {options.map((option: number) => {
        const normalizedStringValue = option < 10 ? `0${option}` : option.toString();
        const isDisabled = disabled && disabled.includes(option);
        const isSelected = selected === option;
        return (
          <S.Cell
            key={`${unit}-${option}`}
            disabled={isDisabled}
            onClick={(): void => {
              onSelect(option);
              setSelected(option);
            }}
            active={isSelected}
            ref={isSelected ? selectedCellRef : null}
          >
            <S.CellText>{normalizedStringValue}</S.CellText>
          </S.Cell>
        );
      })}
    </S.Unit>
  );
};

export default Unit;
