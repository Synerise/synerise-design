import React, { memo, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import * as S from './DropdownSkeleton.styles';
import { type DropdownSkeletonProps } from './DropdownSkeleton.types';

const DropdownSkeleton = ({
  size = 'M',
  numberOfSkeletons = 3,
  className,
}: DropdownSkeletonProps) => {
  const tiles = useMemo(
    () => Array.from({ length: numberOfSkeletons }, () => ({ id: uuid() })),
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
