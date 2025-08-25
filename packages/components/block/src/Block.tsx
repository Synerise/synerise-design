import React from 'react';

import * as S from './Block.styles';
import { type BlockProps } from './Block.types';

/**
 *  @deprecated it will receive no further updates and will be removed from future DS versions
 */
const Block: React.FC<BlockProps> = ({
  className,
  children,
  isDragging,
  icon,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <S.BlockWrapper
      className={`ds-block ${className || ''} ${isDragging ? 'is-dragging' : ''}`}
      ref={ref}
    >
      <S.BlockContent>
        {icon} <S.BlockName>{children}</S.BlockName>
      </S.BlockContent>
    </S.BlockWrapper>
  );
};
export default Block;
