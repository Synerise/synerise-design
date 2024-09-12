import React from 'react';
import * as S from './TagIcon.styles';
import { TagIconProps } from './TagIcon.types';

const TagIconCell = ({ children, ...htmlAttributes }: TagIconProps) => (
  <S.TagIcon {...htmlAttributes}> {children} </S.TagIcon>
);

export default TagIconCell;
