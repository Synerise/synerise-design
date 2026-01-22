import React, { type MouseEvent, useEffect, useRef, useState } from 'react';

import { type Ranger, useRanger } from '@tanstack/react-ranger';

import * as S from '../Slider.styles';
import { type DefaultSliderProps } from '../Slider.types';
import { SliderProvider } from '../context/SliderContext';
import { useColorMap } from '../hooks/useColorMap';
import { reversedInterpolator } from '../utils/Slider.interpolators';
import { couldBeInverted } from '../utils/Slider.utils';
import { SliderAbove } from './SliderAbove';
import { SliderLine } from './SliderLine';
import { SliderMarks } from './SliderMarks';

export const DefaultSlider = (props: DefaultSliderProps) => {
  const {
    label,
    inverted,
    reverse,
    tracksColorMap: customColorMap,
    thick,
    description,
    disabled,
    max = 100,
    min = 0,
    value: initialValue = 50,

    tipFormatter,
    dots,

    step = 1,
    marks,
    onChange,
    onAfterChange,
  } = props;

  const tracksColorMap = useColorMap(1, 'default', customColorMap);
  const rangerRef = useRef<HTMLDivElement>(null);
  const rangerHandlesRef = useRef<Record<number, HTMLElement>>({});
  const [value, setValue] = useState<number>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values: [value],
    min,
    max,
    stepSize: step,
    tickSize: step,
    onDrag: (instance: Ranger<HTMLDivElement>) => {
      setValue(instance.sortedValues[0]);
      onChange?.(instance.sortedValues[0]);
    },
    onChange: (instance: Ranger<HTMLDivElement>) => {
      setValue(instance.sortedValues[0]);
      onAfterChange?.(instance.sortedValues[0]);
    },
    interpolator: reverse ? reversedInterpolator : undefined,
  });

  const handleLineClick = (event: MouseEvent) => {
    const clicked = rangerInstance.getValueForClientX(event.clientX);
    const newValue = rangerInstance.roundToStep(clicked);

    setValue(newValue);
    onChange?.(newValue);
    onAfterChange?.(newValue);
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
          tracksColorMap={tracksColorMap}
          type="default"
          disabled={disabled}
          dots={dots}
          tipFormatter={tipFormatter}
          inverted={couldBeInverted(value, inverted)}
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
