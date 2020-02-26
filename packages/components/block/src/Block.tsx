import * as React from 'react';
import * as S from './Block.styles';

export type BlockProps = {
  className?: string;
  children: React.ReactNode | string;
  isDragging: boolean;
  icon: React.ReactNode;
};

const Block: React.FC<BlockProps> = ({ className, children, isDragging, icon }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <S.BlockWrapper className={`ds-block ${className || ''} ${isDragging ? 'is-dragging' : ''}`} ref={ref}>
      <S.BlockContent>
        {icon} <S.BlockName>{children}</S.BlockName>
      </S.BlockContent>
    </S.BlockWrapper>
  );
};
export default Block;
