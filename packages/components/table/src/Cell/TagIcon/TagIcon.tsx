import React from 'react';
import * as S from './TagIcon.styles';
import { TagIconProps } from './TagIcon.types';

const TagIconCell = ({ children, disabled, ...htmlAttributes }: TagIconProps) => (
  <S.TagIcon {...htmlAttributes} isDisabled={disabled}>
    {children}
  </S.TagIcon>
);

export default TagIconCell;
