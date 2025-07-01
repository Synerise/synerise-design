import React, { useMemo } from 'react';

import * as S from '../../Banner.styles';
import type { BannerSlideProps } from '../../Banner.types';
import { isMediaContent } from '../../utils/isMediaContent';
import { BannerSlideMediaContent, BannerSlideTextContent } from '../index';

export const BannerSlide = ({
  mainContent,
  leftSideContent,
  rightSideContent,
}: BannerSlideProps) => {
  const hasMainContent = Boolean(mainContent);
  const leftSideComponent = useMemo(() => {
    if (!leftSideContent) {
      return <></>;
    }
    return isMediaContent(leftSideContent) ? (
      <BannerSlideMediaContent
        position="left"
        hasMainContent={hasMainContent}
        {...leftSideContent}
      />
    ) : (
      <BannerSlideTextContent
        position="left"
        hasMainContent={hasMainContent}
        {...leftSideContent}
      />
    );
  }, [leftSideContent, hasMainContent]);

  const rightSideComponent = useMemo(() => {
    if (!rightSideContent) {
      return <></>;
    }
    return isMediaContent(rightSideContent) ? (
      <BannerSlideMediaContent
        position="right"
        hasMainContent={hasMainContent}
        {...rightSideContent}
      />
    ) : (
      <BannerSlideTextContent
        position="right"
        hasMainContent={hasMainContent}
        {...rightSideContent}
      />
    );
  }, [rightSideContent, hasMainContent]);

  const mainComponent = useMemo(() => {
    if (!mainContent) {
      return <></>;
    }
    return isMediaContent(mainContent) ? (
      <BannerSlideMediaContent position="main" {...mainContent} />
    ) : (
      <BannerSlideTextContent position="main" {...mainContent} />
    );
  }, [mainContent]);

  return (
    <S.BannerSlideWrapper>
      <S.BannerSlideInner>
        {leftSideComponent}
        {mainComponent}
        {rightSideComponent}
      </S.BannerSlideInner>
    </S.BannerSlideWrapper>
  );
};
