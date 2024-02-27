import React from 'react';
import { SkeletonAvatarProps } from './SkeletonAvatar.types';
import * as S from './SkeletonAvatar.styles';

const SkeletonAvatar = ({ size = 'M', shape, className }: SkeletonAvatarProps) => {
  return (
    <S.Container className={className} shape={shape} size={size}>
      <S.Wrapper shape={shape} size={size}>
        <S.SkeletonBar shape={shape} size={size} />
      </S.Wrapper>
    </S.Container>
  );
};
export default SkeletonAvatar;
