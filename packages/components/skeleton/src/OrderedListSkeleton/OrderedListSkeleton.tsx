import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { type CheckboxSkeletonProps } from '../CheckboxSkeleton/CheckboxSkeleton.types';
import * as S from './OrderedListSkeleton.styles';

const OrderedListSkeleton = ({
  size = 'M',
  numberOfSkeletons = 4,
  className,
}: CheckboxSkeletonProps) => {
  const tiles = useMemo(
    () => Array.from({ length: numberOfSkeletons }, () => ({ id: uuid() })),
    [numberOfSkeletons],
  );
  return (
    <S.Container className={className}>
      <div>
        {tiles.map((tile) => (
          <S.Wrapper key={tile.id} size={size}>
            <S.SkeletonBar size={size} />
          </S.Wrapper>
        ))}
      </div>
    </S.Container>
  );
};
export default OrderedListSkeleton;
