import React from 'react';

import type { ToolbarLabelProps } from '../../Toolbar.types';
import * as S from '../../Toolbar.styles';

export const ToolbarLabel = ({ children, ...htmlAttributes }: ToolbarLabelProps) => {
  return <S.ToolbarLabel {...htmlAttributes}>{children}</S.ToolbarLabel>;
};
