import * as React from 'react';
import { SkeletonAvatarProps } from './SkeletonAvatar.types';
import * as S from './SkeletonAvatar.styles';

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ size = 'M' }) => {
  return (
    <S.Container size={size}>
      <S.Wrapper size={size}>
        <S.SkeletonBar size={size} />
      </S.Wrapper>
    </S.Container>
  );
};
export default SkeletonAvatar;