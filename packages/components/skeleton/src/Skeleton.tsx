import * as React from 'react';
import { SkeletonProps } from './Skeleton.types';
import * as S from './Skeleton.styles';

const Skeleton: React.FC<SkeletonProps> = ({ size = 'M', number,width }) => {
  return (
    <S.Container>
      <S.Wrapper size={size}>
        <S.SkeletonBar width={width} size={size} />
      </S.Wrapper>
      {number && (
        <>
          <S.Wrapper size={size}>
            <S.SkeletonBar width={width} size={size} />
          </S.Wrapper>
          <S.Wrapper size={size}>
            <S.SkeletonBar width={width} size={size} />
          </S.Wrapper>
        </>
      )}
    </S.Container>
  );
};
export default Skeleton;
