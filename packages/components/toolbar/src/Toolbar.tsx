import React from 'react';

import type { ToolbarProps } from './Toolbar.types';
import * as S from './Toolbar.styles';

const Toolbar = ({ children, ...htmlAttributes }: ToolbarProps) => {
  return <S.ToolbarWrapper {...htmlAttributes}>{children}</S.ToolbarWrapper>;
};
export default Toolbar;
