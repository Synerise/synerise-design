import * as React from 'react';
import { SkeletonAvatarProps } from './SkeletonAvatar.types';
import * as S from './SkeletonAvatar.styles';

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ size = 'M', shape }) => {
  return (
    <S.Container shape={shape} size={size}>
      <S.Wrapper shape={shape} size={size}>
        <S.SkeletonBar shape={shape} size={size} />
      </S.Wrapper>
    </S.Container>
  );
};
export default SkeletonAvatar;
