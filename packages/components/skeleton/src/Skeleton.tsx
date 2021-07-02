import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { SkeletonProps } from './Skeleton.types';
import * as S from './Skeleton.styles';

const Skeleton: React.FC<SkeletonProps> = ({ size = 'M', numberOfSkeletons = 2, width }) => {
  const tiles = React.useMemo(() => Array.from({ length: numberOfSkeletons }, () => ({ id: uuid() })), [
    numberOfSkeletons,
  ]);
  return (
    <S.Container>
      {tiles.map(tile => (
        <>
          <S.Wrapper key={tile.id} className="ds-skeleton" size={size} width={width}>
            <S.SkeletonBar width={width} size={size} />
          </S.Wrapper>
        </>
      ))}
    </S.Container>
  );
};
export default Skeleton;
