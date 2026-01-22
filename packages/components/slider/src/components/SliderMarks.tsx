import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Text } from '@synerise/ds-typography';

import * as S from '../Slider.styles';
import { type MarkArea, type SliderMarksProps } from '../Slider.types';
import { useSliderContext } from '../context/SliderContext';
import { getTranslateX, isMarksObjType } from '../utils/Slider.utils';

const HANDLE_HALF_WIDTH = 22;

export const SliderMarks = ({
  marks,
  handlesWithValue = true,
}: SliderMarksProps) => {
  const { rangerInstance, rangerHandles } = useSliderContext();
  const [sliderWidth, setSliderWidth] = useState<number>();
  const [markAreas, setMarkAreas] = useState<Record<string, MarkArea>>({});
  const markRefs = useRef<Record<string, HTMLDivElement>>({});

  const marksData = Object.entries(marks);
  const handles = rangerInstance.handles().map((handle) => handle.value);

  useEffect(() => {
    const element = rangerInstance.options.getRangerElement();
    if (element?.clientWidth) {
      setSliderWidth(element.clientWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const areas: Record<string, MarkArea> = {};
    Object.keys(markRefs.current).forEach((index: string) => {
      const markElement = markRefs.current[index];
      areas[index] = {
        left: markElement.offsetLeft + getTranslateX(markElement),
        width: markElement.clientWidth,
      } satisfies MarkArea;
    });
    setMarkAreas(areas);
  }, []);

  const isNearHandle = useCallback(
    (index: number) => {
      const markArea = markAreas[index];
      if (!markArea || !sliderWidth) {
        return false;
      }

      return (
        handlesWithValue &&
        handles.some((handleValue, handleIndex) => {
          const tooltipHalfWidth = rangerHandles.current?.[handleIndex]
            ? rangerHandles.current?.[handleIndex].clientWidth / 2
            : HANDLE_HALF_WIDTH;

          const handleLeft = rangerInstance.getPercentageForValue(handleValue);
          const handleLeftPx = (handleLeft * sliderWidth) / 100;
          const handleLowerThanMark = handleLeftPx < markArea.left;

          return (
            (handleLowerThanMark &&
              handleLeftPx + tooltipHalfWidth > markArea.left) ||
            (!handleLowerThanMark &&
              handleLeftPx - tooltipHalfWidth < markArea.left + markArea.width)
          );
        })
      );
    },
    [
      handles,
      handlesWithValue,
      markAreas,
      rangerHandles,
      rangerInstance,
      sliderWidth,
    ],
  );

  return (
    <S.SliderMarks data-testid="ds-slider-marks">
      {marksData.map(([mark, markLabel], index) => {
        const markValue = parseFloat(mark);
        const left = rangerInstance.getPercentageForValue(markValue);
        const labelStyle = isMarksObjType(markLabel)
          ? markLabel.style
          : undefined;

        const labelContent = isMarksObjType(markLabel)
          ? markLabel.label
          : markLabel;

        return (
          <S.SliderMark
            ref={(node) => node && (markRefs.current[index] = node)}
            isNear={isNearHandle(index)}
            $left={left}
            key={`slider-mark-${index}`}
          >
            <Text size="medium" style={labelStyle}>
              {labelContent}
            </Text>
          </S.SliderMark>
        );
      })}
    </S.SliderMarks>
  );
};
