import React, { memo, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import Checkbox from '@synerise/ds-checkbox';

import * as S from './CheckboxSkeleton.styles';
import { type CheckboxSkeletonProps } from './CheckboxSkeleton.types';

const CheckboxSkeleton = ({
  size = 'M',
  numberOfSkeletons = 2,
  className,
}: CheckboxSkeletonProps) => {
  const tiles = useMemo(
    () => Array.from({ length: numberOfSkeletons }, () => ({ id: uuid() })),
    [numberOfSkeletons],
  );
  return (
    <S.Container className={className}>
      <Checkbox />
      <S.SkeletonWrapper>
        {tiles.map((tile) => (
          <S.Wrapper key={tile.id} size={size}>
            <S.SkeletonBar size={size} />
          </S.Wrapper>
        ))}
      </S.SkeletonWrapper>
    </S.Container>
  );
};
export default memo(CheckboxSkeleton);
