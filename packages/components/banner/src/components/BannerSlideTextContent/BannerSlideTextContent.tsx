import React from 'react';

import { TagShape } from '@synerise/ds-tag';

import {
  DEFAULT_STATUS_COLOR,
  DEFAULT_STATUS_TEXT_COLOR,
} from '../../Banner.const';
import * as S from '../../Banner.styles';
import type {
  BannerSlideContentProps,
  BannerSlideTextContentProps,
} from '../../Banner.types';

export const BannerSlideTextContent = ({
  title,
  titlePrefix,
  titleStatus,
  description,
  position,
  buttons,
  hasMainContent,
}: BannerSlideTextContentProps & BannerSlideContentProps) => {
  return (
    <S.BannerSlideContentWrapper
      hasMainContent={!!hasMainContent}
      position={position}
      type="text"
    >
      {title && (
        <>
          {titleStatus && (
            <div>
              <S.BannerSlideTitleStatus
                color={DEFAULT_STATUS_COLOR}
                textColor={DEFAULT_STATUS_TEXT_COLOR}
                {...titleStatus}
                asPill
                shape={TagShape.SMALL_SQUARE}
              />
            </div>
          )}
          <S.BannerSlideTitle>
            {titlePrefix && (
              <S.BannerSlideTitlePrefix>{titlePrefix}</S.BannerSlideTitlePrefix>
            )}
            <S.BannerSlideTitleText level={1}>{title}</S.BannerSlideTitleText>
          </S.BannerSlideTitle>
        </>
      )}
      {description && (
        <S.BannerSlideDescription>{description}</S.BannerSlideDescription>
      )}

      {buttons && <S.BannerSlideButtons>{buttons}</S.BannerSlideButtons>}
    </S.BannerSlideContentWrapper>
  );
};
