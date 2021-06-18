import * as React from 'react';
import * as S from './OrderedListSkeleton.styles';
import { CheckboxSkeletonProps } from '../CheckboxSkeleton/CheckboxSkeleton.types';

const OrderedListSkeleton: React.FC<CheckboxSkeletonProps> = ({ size = 'M' }) => {
  return (
    <S.Container>
      <div>
        <S.Wrapper size={size}>
          <S.SkeletonBar size={size} />
        </S.Wrapper>
        <S.Wrapper size={size}>
          <S.SkeletonBar size={size} />
        </S.Wrapper>
        <S.Wrapper size={size}>
          <S.SkeletonBar size={size} />
        </S.Wrapper>
        <S.Wrapper size={size}>
          <S.SkeletonBar size={size} />
        </S.Wrapper>
      </div>
    </S.Container>
  );
};
export default OrderedListSkeleton;