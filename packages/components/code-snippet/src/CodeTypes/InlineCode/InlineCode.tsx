import React from 'react';

import * as S from './InlineCode.styles';

export interface InlineCodeProps {
  children?: string;
  className?: string;
}
const InlineCode: React.FC<InlineCodeProps> = ({
  children = '',
  className,
}) => {
  return (
    <S.InlineCodeWrapper className={className}>{children}</S.InlineCodeWrapper>
  );
};

export default InlineCode;
