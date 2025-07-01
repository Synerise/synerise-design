import React from 'react';

import * as S from './Toolbar.styles';
import type { ToolbarProps } from './Toolbar.types';

const Toolbar = ({ children, ...htmlAttributes }: ToolbarProps) => {
  return <S.ToolbarWrapper {...htmlAttributes}>{children}</S.ToolbarWrapper>;
};
export default Toolbar;
