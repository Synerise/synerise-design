import React, { useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Button from '@synerise/ds-button';
import Icon, { CloseM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { DEFAULT_SLIDE_SPEED } from './Banner.const';
import * as S from './Banner.styles';
import type { BannerProps } from './Banner.types';
import { BannerCounter, BannerHeader, BannerSlide } from './components';
import { useCarousel, useTexts } from './hooks';

const Banner = ({
  slides,
  autoPlay = true,
  autoPlaySpeed = DEFAULT_SLIDE_SPEED,
  transitionEffect = 'scrollx',
  onAfterChange,
  onBeforeChange,
  texts,
  onClose,
  expandable,
  ...htmlAttributes
}: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(
    expandable?.isExpanded !== undefined ? expandable?.isExpanded : true,
  );
  const { bannerRef, handleDotClick, handleNextClick, handlePrevClick } =
    useCarousel();
  const allTexts = useTexts(texts);

  const slidesWithUUID = useMemo(() => {
    return slides.map((slide) => ({ ...slide, id: uuid() }));
  }, [slides]);

  const handleBeforeChange = (from: number, to: number) => {
    setCurrentIndex(to);

    onBeforeChange?.(from, to);
  };
  const closeButton = onClose && (
    <S.BannerCloseWrapper>
      <Tooltip title={texts?.closeTooltip}>
        <Button onClick={onClose} mode="single-icon" type="ghost">
          <Icon component={<CloseM />} />
        </Button>
      </Tooltip>
    </S.BannerCloseWrapper>
  );
  const expandableHeader = expandable && (
    <BannerHeader
      {...expandable}
      isExpanded={isExpanded}
      closeButton={closeButton}
      onToggle={setIsExpanded}
      texts={allTexts}
    />
  );

  return (
    <S.BannerWrapper {...htmlAttributes} count={slides.length}>
      {expandableHeader || closeButton}
      {isExpanded && (
        <>
          <S.BannerSlides
            ref={bannerRef}
            afterChange={onAfterChange}
            beforeChange={handleBeforeChange}
            autoplay={autoPlay}
            autoplaySpeed={autoPlaySpeed}
            effect={transitionEffect}
            dots={false}
          >
            {slidesWithUUID.map((slide) => (
              <BannerSlide {...slide} key={slide.id} />
            ))}
          </S.BannerSlides>
          {slides.length > 1 && (
            <BannerCounter
              onPrevClick={handlePrevClick}
              onNextClick={handleNextClick}
              onDotClick={handleDotClick}
              currentIndex={currentIndex}
              slides={slidesWithUUID}
            />
          )}
        </>
      )}
    </S.BannerWrapper>
  );
};
export default Banner;
