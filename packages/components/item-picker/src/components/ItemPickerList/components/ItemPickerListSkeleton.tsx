import React from 'react';

import * as S from '../ItemPickerList.styles';

export const ItemPickerListSkeleton = ({
  wrapperHeight,
}: {
  wrapperHeight?: number;
}) => {
  return (
    <S.SkeletonWrapper wrapperHeight={wrapperHeight}>
      <S.Skeleton numberOfSkeletons={1} size="M" />
      <S.Skeleton numberOfSkeletons={1} size="M" />
      <S.Skeleton numberOfSkeletons={1} size="M" />
      <S.Skeleton numberOfSkeletons={1} size="M" />
      <S.Skeleton numberOfSkeletons={1} size="M" />
    </S.SkeletonWrapper>
  );
};
