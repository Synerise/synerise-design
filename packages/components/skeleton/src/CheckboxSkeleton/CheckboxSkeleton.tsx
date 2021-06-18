import * as React from 'react';
import Checkbox from '@synerise/ds-checkbox/dist';
import { CheckboxSkeletonProps } from './CheckboxSkeleton.types';
import * as S from './CheckboxSkeleton.styles';

const CheckboxSkeleton: React.FC<CheckboxSkeletonProps> = ({ size = 'M' }) => {
  return (
    <S.Container>
      <Checkbox />
      <div>
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
export default CheckboxSkeleton;
