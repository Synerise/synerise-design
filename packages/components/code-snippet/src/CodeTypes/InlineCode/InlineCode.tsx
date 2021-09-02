import * as React from 'react';
import * as S from '../../CodeSnippet.styles';

export interface InlineCodeProps {
  children?: string;
}
const InlineCode: React.FC<InlineCodeProps> = ({ children = '' }) => {
  return <S.InlineCodeWrapper>{children}</S.InlineCodeWrapper>;
};

export default InlineCode;
