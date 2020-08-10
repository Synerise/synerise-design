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

const CELL_HEIGHT = 32;

const Unit: React.FC<UnitProps> = ({ options, disabled, value, unit, onSelect }) => {
  const selected = value && dayjs(value).get(unit);
  const [forceUpdate, setForceUpdate] = React.useState<boolean>(false);
  const selectedCellRef = React.useRef<HTMLButtonElement>(null);
  const unitContainerRef = React.useRef<HTMLDivElement>(null);
  const [isFirstRender, setFirstRender] = React.useState<boolean>(true);
  const [containerHeight, setContainerHeight] = React.useState<number>(300);

  React.useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      if (unitContainerRef.current) {
        setContainerHeight(unitContainerRef.current.offsetHeight);
      }
    }
  }, [isFirstRender, unitContainerRef]);

  React.useEffect(() => {
    if (selectedCellRef.current && unitContainerRef.current) {
      const offsetToParent = selectedCellRef.current.offsetTop - unitContainerRef.current.offsetTop;
      const scrollBehaviour = isFirstRender || !containerHeight ? 'auto' : 'smooth';
      unitContainerRef?.current &&
        unitContainerRef.current.scrollTo({ top: offsetToParent, behavior: scrollBehaviour });
      setContainerHeight(unitContainerRef.current.offsetHeight);
    }
  }, [selectedCellRef, unitContainerRef, isFirstRender, forceUpdate, containerHeight]);
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
              setForceUpdate(!forceUpdate);
            }}
            active={isSelected}
            ref={isSelected ? selectedCellRef : null}
          >
            <S.CellText>{normalizedStringValue}</S.CellText>
          </S.Cell>
        );
      })}
      {!!containerHeight && (
        <S.PlaceholderWrapper>
          <S.Placeholder height={containerHeight - CELL_HEIGHT} />
        </S.PlaceholderWrapper>
      )}
    </S.Unit>
  );
};

export default Unit;
