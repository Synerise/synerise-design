import React from 'react';

import { useTheme } from '@synerise/ds-core';

import * as S from '../Slider.styles';
import { type ColorMap } from '../Slider.types';
import { useSliderContext } from '../context/SliderContext';
import { getVisibleSectionsForType } from '../utils/Slider.utils';

type SliderSectionsProps = {
  type: 'range' | 'allocation' | 'default';
  tracksColorMap: ColorMap;
  reverse?: boolean;
};
type Section = { left: number; width: number };
const normalizeReversed = (section: Section, reverse?: boolean): Section => {
  return reverse
    ? {
        width: -section.width,
        left: section.left + section.width,
      }
    : section;
};

export const SliderSections = ({
  tracksColorMap,
  type = 'default',
  reverse,
}: SliderSectionsProps) => {
  const theme = useTheme();
  const { rangerInstance } = useSliderContext();
  const steps = rangerInstance.getSteps();
  return (
    <>
      {steps
        .filter(getVisibleSectionsForType(type, steps.length))
        .map((section, index) => {
          const normalisedSection = normalizeReversed(section, reverse);
          return (
            <S.SliderSection
              key={`slider-section-${index}`}
              data-testid={`ds-slider-section`}
              data-index={index}
              $left={normalisedSection.left}
              $width={normalisedSection.width}
              data-color={tracksColorMap[index]}
              $color={theme.palette[tracksColorMap[index]]}
            />
          );
        })}
    </>
  );
};
