import * as React from 'react';
import * as S from './TagIcon.styles';
import { Props } from './TagIcon.types';

const TagIconCell: React.FC<Props> = ({ children }: Props) => <S.TagIcon> {children} </S.TagIcon>;

export default TagIconCell;
