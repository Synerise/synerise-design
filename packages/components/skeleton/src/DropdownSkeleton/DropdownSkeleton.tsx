import React, { memo, useMemo } from 'react';

import { generateUuid } from '@synerise/ds-utils';

import * as S from './DropdownSkeleton.styles';
import type { DropdownSkeletonProps } from './DropdownSkeleton.types';

const DropdownSkeleton = ({
  size = 'M',
  numberOfSkeletons = 3,
  className,
}: DropdownSkeletonProps) => {
  const tiles = useMemo(
    () =>
      Array.from({ length: numberOfSkeletons }, () => ({
        id: generateUuid(),
      })),
    [numberOfSkeletons],
  );
  return (
    <S.Container className={className}>
      {tiles.map((tile) => (
        <S.Wrapper key={tile.id} size={size}>
          <S.SkeletonBar size={size} />
        </S.Wrapper>
      ))}
    </S.Container>
  );
};
export default memo(DropdownSkeleton);
