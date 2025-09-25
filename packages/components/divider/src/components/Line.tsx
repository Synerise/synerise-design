import React from 'react';

import { type DividerProps } from '../Divider.types';
import * as S from './Line.styles';

export const Line = ({
  marginBottom,
  marginTop,
  type = 'horizontal',
  dashed,
  className,
  ...htmlAttributes
}: DividerProps) => {
  return (
    <S.Line
      className={`ds-divider-line ${className}`}
      role="separator"
      marginTop={marginTop}
      marginBottom={marginBottom}
      type={type}
      dashed={dashed}
      {...htmlAttributes}
    />
  );
};
