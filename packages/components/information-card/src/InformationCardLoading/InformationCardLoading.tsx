import React from 'react';

import Skeleton, { SkeletonAvatar } from '@synerise/ds-skeleton';

import * as S from '../InformationCard.styles';
import { type InformationCardLoadingProps } from './InformationCardLoading.types';

export const InformationCardLoading = ({
  hasFooter,
}: InformationCardLoadingProps) => (
  <>
    <S.LoadingBody data-testid="information-card-loading">
      <S.LoadingHeader>
        <SkeletonAvatar size="M" shape="square" />
        <S.LoadingTitle>
          <Skeleton numberOfSkeletons={1} height={16} />
        </S.LoadingTitle>
      </S.LoadingHeader>
      <Skeleton numberOfSkeletons={1} height={16} />
      <Skeleton numberOfSkeletons={1} height={16} />
    </S.LoadingBody>
    {hasFooter && (
      <S.LoadingFooter data-testid="information-card-loading-footer" />
    )}
  </>
);
