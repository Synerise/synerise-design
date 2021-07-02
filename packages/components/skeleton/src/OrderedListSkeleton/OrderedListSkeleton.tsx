import * as React from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './OrderedListSkeleton.styles';
import { CheckboxSkeletonProps } from '../CheckboxSkeleton/CheckboxSkeleton.types';

const OrderedListSkeleton: React.FC<CheckboxSkeletonProps> = ({ size = 'M', numberOfSkeletons = 4 }) => {
  const tiles = React.useMemo(() => Array.from({ length: numberOfSkeletons }, () => ({ id: uuid() })), [
    numberOfSkeletons,
  ]);
  return (
    <S.Container>
      <div>
        {tiles.map(tile => (
          <S.Wrapper key={tile.id} size={size}>
            <S.SkeletonBar size={size} />
          </S.Wrapper>
        ))}
      </div>
    </S.Container>
  );
};
export default OrderedListSkeleton;
