import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { DropdownSkeletonProps } from './DropdownSkeleton.types';
import * as S from './DropdownSkeleton.styles';

const DropdownSkeleton: React.FC<DropdownSkeletonProps> = ({ size = 'M', numberOfSkeletons = 3 }) => {
  const tiles = React.useMemo(() => Array.from({ length: numberOfSkeletons }, () => ({ id: uuid() })), [
    numberOfSkeletons,
  ]);
  return (
    <S.Container>
      {tiles.map(tile => (
        <S.Wrapper key={tile.id} size={size}>
          <S.SkeletonBar size={size} />
        </S.Wrapper>
      ))}
    </S.Container>
  );
};
export default React.memo(DropdownSkeleton);
