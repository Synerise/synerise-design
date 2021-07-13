import * as React from 'react';
import Checkbox from '@synerise/ds-checkbox/dist';
import { v4 as uuid } from 'uuid';
import { CheckboxSkeletonProps } from './CheckboxSkeleton.types';
import * as S from './CheckboxSkeleton.styles';

const CheckboxSkeleton: React.FC<CheckboxSkeletonProps> = ({ size = 'M', numberOfSkeletons = 2 }) => {
  const tiles = React.useMemo(() => Array.from({ length: numberOfSkeletons }, () => ({ id: uuid() })), [
    numberOfSkeletons,
  ]);
  return (
    <S.Container>
      <Checkbox />
      <S.SkeletonWrapper>
        {tiles.map(tile => (
          <S.Wrapper key={tile.id} size={size}>
            <S.SkeletonBar size={size} />
          </S.Wrapper>
        ))}
      </S.SkeletonWrapper>
    </S.Container>
  );
};
export default React.memo(CheckboxSkeleton);
