import React, { type MouseEvent } from 'react';

import * as S from '../Slider.styles';
import {
  type BaseSliderProps,
  type ColorMap,
  type HandlerConfig,
  type SharedSliderProps,
} from '../Slider.types';
import { useInvertedColors } from '../hooks/useInvertedColors';
import { SliderDots } from './SliderDots';
import { SliderHandles } from './SliderHandles';
import { SliderSections } from './SliderSections';

type SliderHandlesProps = Pick<
  SharedSliderProps,
  'disabled' | 'dots' | 'thick'
> &
  Pick<BaseSliderProps, 'inverted' | 'tipFormatter' | 'reverse'> & {
    type: 'allocation' | 'range' | 'default';
    tracksColorMap: ColorMap;
    onLineClick?: (event: MouseEvent<HTMLDivElement>) => void;
    handlersConfig?: HandlerConfig;
  };
export const SliderLine = ({
  disabled,
  onLineClick,
  tracksColorMap: colorMap,
  thick,
  type,
  handlersConfig,
  inverted,
  tipFormatter,
  reverse,
  dots,
}: SliderHandlesProps) => {
  const { lineColor, tracksColorMap } = useInvertedColors({
    inverted: !!inverted,
    colorMap,
  });
  return (
    <S.SliderBar $type={type} data-testid="ds-slider-bar" onClick={onLineClick}>
      <S.SliderLine
        data-testid="ds-slider-line"
        lineColor={lineColor}
        thick={thick}
      >
        <SliderSections
          reverse={reverse}
          tracksColorMap={tracksColorMap}
          type={type}
        />
      </S.SliderLine>
      {dots && <SliderDots type={type} tracksColorMap={tracksColorMap} />}
      <SliderHandles
        type={type}
        handlersConfig={handlersConfig}
        disabled={disabled}
        tipFormatter={tipFormatter}
      />
    </S.SliderBar>
  );
};
