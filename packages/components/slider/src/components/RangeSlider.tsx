import React, { type MouseEvent, useEffect, useRef, useState } from 'react';

import { type Ranger, useRanger } from '@tanstack/react-ranger';

import * as S from '../Slider.styles';
import { type RangeSliderProps, type RangeValue } from '../Slider.types';
import { SliderProvider } from '../context/SliderContext';
import { useColorMap } from '../hooks/useColorMap';
import { reversedInterpolator } from '../utils/Slider.interpolators';
import { couldBeInverted, getClosestIndex } from '../utils/Slider.utils';
import { SliderAbove } from './SliderAbove';
import { SliderLine } from './SliderLine';
import { SliderMarks } from './SliderMarks';

export const RangeSlider = (props: Omit<RangeSliderProps, 'range'>) => {
  const {
    label,
    inverted,
    tracksColorMap,
    thick,
    description,
    disabled,
    max = 100,
    min = 0,
    value: initialValue = [],

    step = 1,
    marks,
    onChange,
    onAfterChange,
    tipFormatter,
    dots,
    reverse,
  } = props;

  const colorMap = useColorMap(initialValue.length, 'range', tracksColorMap);

  const rangerRef = useRef<HTMLDivElement>(null);
  const rangerHandlesRef = useRef<Record<number, HTMLElement>>({});
  const [values, setValues] = useState<RangeValue>(initialValue);

  useEffect(() => {
    setValues(initialValue);
  }, [initialValue]);

  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values,
    min,
    max,
    stepSize: step,
    tickSize: step,
    onDrag: (instance: Ranger<HTMLDivElement>) => {
      const roundedValues = instance.sortedValues.map(
        rangerInstance.roundToStep,
      );
      setValues(roundedValues);
      onChange?.(roundedValues);
    },
    onChange: (instance: Ranger<HTMLDivElement>) => {
      const roundedValues = instance.sortedValues.map(
        rangerInstance.roundToStep,
      );
      setValues(roundedValues);
      onAfterChange?.(roundedValues);
    },
    interpolator: reverse ? reversedInterpolator : undefined,
  });

  const handleLineClick = (event: MouseEvent) => {
    const clicked = rangerInstance.getValueForClientX(event.clientX);
    const newValue = rangerInstance.roundToStep(clicked);
    const closestIndex = getClosestIndex(values, clicked);
    const updatedValues = values
      .map((item, index) => (index === closestIndex ? newValue : item))
      .sort((a, b) => a - b);
    setValues(updatedValues);
    onChange?.(updatedValues);
    onAfterChange?.(updatedValues);
  };

  return (
    <SliderProvider
      rangerInstance={rangerInstance}
      rangerHandles={rangerHandlesRef}
    >
      <S.SliderWrapper
        withoutMarks={!marks}
        ref={rangerRef}
        $disabled={disabled}
      >
        <SliderAbove label={label} description={description} />
        <SliderLine
          onLineClick={!disabled ? handleLineClick : undefined}
          thick={thick}
          tracksColorMap={colorMap}
          type="range"
          disabled={disabled}
          dots={dots}
          tipFormatter={tipFormatter}
          inverted={couldBeInverted(values, inverted)}
          reverse={reverse}
        />
        {marks && (
          <SliderMarks
            handlesWithValue={tipFormatter !== false}
            marks={marks}
          />
        )}
      </S.SliderWrapper>
    </SliderProvider>
  );
};
