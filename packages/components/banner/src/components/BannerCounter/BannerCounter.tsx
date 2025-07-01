import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { AngleLeftS, AngleRightS } from '@synerise/ds-icon';

import * as S from '../../Banner.styles';
import type { BannerCounterProps } from '../../Banner.types';

export const BannerCounter = ({
  slides,
  currentIndex,
  onDotClick,
  onPrevClick,
  onNextClick,
}: BannerCounterProps) => {
  return (
    <S.BannerCounterWrapper data-testid="banner-counter">
      <Button type="ghost" onClick={onPrevClick} mode="single-icon">
        <Icon component={<AngleLeftS />} />
      </Button>
      {slides.map((slide, index) => (
        <S.BannerCounterDot
          key={slide.id}
          active={index === currentIndex}
          onClick={() => onDotClick(index)}
        />
      ))}
      <Button type="ghost" onClick={onNextClick} mode="single-icon">
        <Icon component={<AngleRightS />} />
      </Button>
    </S.BannerCounterWrapper>
  );
};
