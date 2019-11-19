import * as React from 'react';
import * as S from './Block.styles';
import { BlockProps } from './Block.types';

const Block: React.FC<BlockProps> = ({ children, isDragging, icon }) => {
  return (
    <S.BlockWrapper className={isDragging ? 'is-dragging' : ''}>
      <S.BlockContent>
        {icon} <S.BlockName>{children}</S.BlockName>
      </S.BlockContent>
    </S.BlockWrapper>
  );
};
export default Block;
