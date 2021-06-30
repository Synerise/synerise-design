import * as React from 'react';
import { SkeletonProps } from './Skeleton.types';
import * as S from './Skeleton.styles';

const Skeleton: React.FC<SkeletonProps> = ({ size = 'M', number, width }) => {
  return (
    <S.Container>
      <S.Wrapper className="ds-skeleton" size={size} width={width}>
        <S.SkeletonBar width={width} size={size} />
      </S.Wrapper>
      {number && (
        <>
          <S.Wrapper className="ds-skeleton" size={size} width={width}>
            <S.SkeletonBar width={width} size={size} />
          </S.Wrapper>
          <S.Wrapper className="ds-skeleton" size={size} width={width}>
            <S.SkeletonBar width={width} size={size} />
          </S.Wrapper>
        </>
      )}
    </S.Container>
  );
};
export default Skeleton;
