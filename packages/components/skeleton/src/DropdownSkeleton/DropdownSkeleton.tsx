import * as React from 'react';
import { DropdownSkeletonProps } from './DropdownSkeleton.types';
import * as S from './DropdownSkeleton.styles';

const DropdownSkeleton: React.FC<DropdownSkeletonProps> = ({ size = 'M' }) => {
  return (
    <S.Container>
      <S.Wrapper size={size}>
        <S.SkeletonBar size={size} />
      </S.Wrapper>
      <S.Wrapper size={size}>
        <S.SkeletonBar size={size} />
      </S.Wrapper>
      <S.Wrapper size={size}>
        <S.SkeletonBar size={size} />
      </S.Wrapper>
    </S.Container>
  );
};
export default DropdownSkeleton;
