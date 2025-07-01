import React from 'react';

import * as S from '../../Toolbar.styles';
import type { ToolbarLabelProps } from '../../Toolbar.types';

export const ToolbarLabel = ({
  children,
  ...htmlAttributes
}: ToolbarLabelProps) => {
  return <S.ToolbarLabel {...htmlAttributes}>{children}</S.ToolbarLabel>;
};
