import * as React from 'react';
import * as S from './TagIcon.styles';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const TagIconCell: React.FC<Props> = ({ children }: Props) => <S.TagIcon> {children} </S.TagIcon>;

export default TagIconCell;
