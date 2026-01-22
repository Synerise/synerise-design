import React, { useMemo } from 'react';

import * as S from '../Slider.styles';
import { type ColorMap } from '../Slider.types';
import { useSliderContext } from '../context/SliderContext';
import { getVisibleSectionsForType } from '../utils/Slider.utils';

type SliderDotsProps = {
  tracksColorMap: ColorMap;
  type: 'default' | 'range' | 'allocation';
};
export const SliderDots = ({ tracksColorMap, type }: SliderDotsProps) => {
  const { rangerInstance } = useSliderContext();
  const dots = rangerInstance.getTicks();

  const steps = rangerInstance.getSteps();
  const tickSize = rangerInstance.options.tickSize ?? 1;
  const dotColorMap = useMemo(() => {
    const map: Record<number, string> = {};
    steps
      .filter(getVisibleSectionsForType(type, steps.length))
      .forEach((step, stepIndex) => {
        const start = step.left;
        const end = start + step.width;
        for (let i = start; i < end; i += tickSize) {
          map[i] = tracksColorMap[stepIndex];
        }
      });
    return map;
  }, [steps, tickSize, tracksColorMap, type]);

  return (
    <div data-testid="ds-slider-dots">
      {dots.map((dot, index) => {
        return (
          <S.SliderDot
            key={`slider-dot-${dot.key}`}
            data-testid={`ds-slider-dot`}
            data-index={index}
            $left={dot.percentage}
            $color={dotColorMap[dot.value]}
          />
        );
      })}
    </div>
  );
};
