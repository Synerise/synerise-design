import React from 'react';

import { type ItemSize, itemSizes } from '@synerise/ds-list-item';
import { SkeletonAvatar } from '@synerise/ds-skeleton';

import * as S from '../ItemPickerList.styles';

const ROWS = [0, 1, 2, 3, 4];

export const ItemPickerListSkeleton = ({
  wrapperHeight,
  rowSize = itemSizes.DEFAULT,
}: {
  wrapperHeight?: number;
  rowSize?: ItemSize;
}) => {
  if (rowSize === itemSizes.LARGE) {
    return (
      <S.SkeletonWrapper wrapperHeight={wrapperHeight}>
        {ROWS.map((row) => (
          <S.LargeSkeletonRow
            key={row}
            data-testid="ds-item-picker-skeleton-large-row"
          >
            <SkeletonAvatar size="M" shape="square" />
            <S.LargeSkeletonText>
              <S.Skeleton numberOfSkeletons={1} size="M" />
              <S.Skeleton numberOfSkeletons={1} size="S" />
            </S.LargeSkeletonText>
          </S.LargeSkeletonRow>
        ))}
      </S.SkeletonWrapper>
    );
  }
  return (
    <S.SkeletonWrapper wrapperHeight={wrapperHeight}>
      {ROWS.map((row) => (
        <S.Skeleton key={row} numberOfSkeletons={1} size="M" />
      ))}
    </S.SkeletonWrapper>
  );
};
