import React from 'react';

import * as S from '../../Banner.styles';
import type {
  BannerSlideContentProps,
  BannerSlideMediaContentProps,
} from '../../Banner.types';

export const BannerSlideMediaContent = ({
  media,
  position,
  hasMainContent,
}: BannerSlideMediaContentProps & BannerSlideContentProps) => {
  return (
    <S.BannerSlideContentWrapper
      hasMainContent={!!hasMainContent}
      position={position}
      type="media"
    >
      <S.BannerSlideMediaWrapper>{media}</S.BannerSlideMediaWrapper>
    </S.BannerSlideContentWrapper>
  );
};
