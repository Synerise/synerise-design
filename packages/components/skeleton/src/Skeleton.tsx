import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { SkeletonProps } from './Skeleton.types';
import * as S from './Skeleton.styles';

const Skeleton = ({ size = 'M', numberOfSkeletons = 2, width, height, className }: SkeletonProps) => {
  const tiles = useMemo(() => Array.from({ length: numberOfSkeletons }, () => ({ id: uuid() })), [numberOfSkeletons]);
  return (
    <S.Container data-testid="ds-skeleton" className={className}>
      {tiles.map(tile => (
        <>
          <S.Wrapper key={tile.id} className="ds-skeleton" size={size} width={width} height={height}>
            <S.SkeletonBar width={width} size={size} />
          </S.Wrapper>
        </>
      ))}
    </S.Container>
  );
};
export default Skeleton;
