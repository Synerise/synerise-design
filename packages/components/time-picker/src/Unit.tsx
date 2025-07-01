import type dayjs from 'dayjs';
import { debounce } from 'debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import Scrollbar from '@synerise/ds-scrollbar';

import * as S from './TimePicker.styles';
import { getUnitSelectedNumber } from './utils/unit.utils';

export type UnitConfig = {
  unit: dayjs.UnitType;
  options: number[];
  disabled?: number[];
  insertSeperator?: boolean;
  use12HourClock?: boolean | undefined;
};

export type UnitProps = UnitConfig & {
  value?: Date;
  onSelect: (value: number) => void;
};

const CELL_HEIGHT = 32;
const DEBOUNCE_DELAY = 150;

const Unit = ({
  options,
  disabled,
  value,
  unit,
  onSelect,
  use12HourClock,
}: UnitProps) => {
  const selected: number | undefined = useMemo(
    () => getUnitSelectedNumber(value, unit, use12HourClock),
    [unit, use12HourClock, value],
  );

  const [forceUpdate, setForceUpdate] = useState<boolean>(false);
  const selectedCellRef = useRef<HTMLButtonElement>(null);
  const unitContainerRef = useRef<HTMLDivElement>(null);

  const [containerHeight, setContainerHeight] = useState<number>(300);
  const [isFirstRender, setFirstRender] = useState<boolean>(true);
  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      if (unitContainerRef.current) {
        setContainerHeight(unitContainerRef.current.offsetHeight);
      }
    }
  }, [isFirstRender, unitContainerRef]);

  const scrollHandler = () => {
    if (!!unitContainerRef && !!unitContainerRef.current) {
      const pixelsScrolled = unitContainerRef.current.scrollTop;
      const isScrollBetweenTwoCells = pixelsScrolled % CELL_HEIGHT !== 0;

      pixelsScrolled !== 0 &&
        isScrollBetweenTwoCells &&
        typeof unitContainerRef.current.scrollTo === 'function' &&
        unitContainerRef.current.scrollTo({
          top: Math.round(pixelsScrolled / CELL_HEIGHT) * CELL_HEIGHT,
          behavior: 'smooth',
        });
    }
  };
  const debouncedScrollHandler = debounce(scrollHandler, DEBOUNCE_DELAY);

  useEffect(() => {
    return () => {
      debouncedScrollHandler.clear();
    };
  }, [debouncedScrollHandler]);

  useEffect(() => {
    if (selectedCellRef.current && unitContainerRef.current) {
      const offsetToParent =
        selectedCellRef.current.offsetTop - unitContainerRef.current.offsetTop;
      const scrollBehaviour =
        isFirstRender || !containerHeight ? 'auto' : 'smooth';
      if (typeof unitContainerRef.current.scrollTo === 'function') {
        unitContainerRef.current.scrollTo({
          top: offsetToParent,
          behavior: scrollBehaviour,
        });
      }
      setContainerHeight(unitContainerRef.current.offsetHeight);
    }
  }, [
    selectedCellRef,
    unitContainerRef,
    isFirstRender,
    forceUpdate,
    containerHeight,
  ]);

  return (
    <S.Unit data-testid={`ds-time-picker-unit-${unit}`}>
      <Scrollbar
        confineScroll
        ref={unitContainerRef}
        onScroll={debouncedScrollHandler}
        maxHeight={192}
      >
        {options.map((option) => {
          const normalizedStringValue =
            option < 10 ? `0${option}` : option.toString();
          const isDisabled = disabled && disabled.includes(option);
          const isSelected = selected === option;

          return (
            <S.Cell
              key={`${unit}-${option}`}
              disabled={isDisabled}
              onClick={(): void => {
                onSelect(option);
                setTimeout(() => {
                  // timeout is required to make sure that the ref is updated
                  setForceUpdate(!forceUpdate);
                }, 50);
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
      </Scrollbar>
    </S.Unit>
  );
};

export default Unit;
