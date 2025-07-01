import React from 'react';

import * as S from '../../Toolbar.styles';
import type { ToolbarGroupProps } from '../../Toolbar.types';

export const ToolbarGroup = ({
  children,
  isCompact,
  ...htmlAttributes
}: ToolbarGroupProps) => {
  return (
    <S.ToolbarGroup isCompact={isCompact} {...htmlAttributes}>
      {children}
    </S.ToolbarGroup>
  );
};
