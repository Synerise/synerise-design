import React from 'react';

import type { ToolbarGroupProps } from '../../Toolbar.types';
import * as S from '../../Toolbar.styles';

export const ToolbarGroup = ({ children, isCompact, ...htmlAttributes }: ToolbarGroupProps) => {
  return (
    <S.ToolbarGroup isCompact={isCompact} {...htmlAttributes}>
      {children}
    </S.ToolbarGroup>
  );
};
