import React from 'react';
import * as S from './ShortCuts.style';
import { ShortCutsProps } from './ShortCuts.types';

const ShortCuts = ({ size, children, color, icon, ...htmlAttributes }: ShortCutsProps) => {
  return (
    <S.ShortCutWrapper color={color} {...htmlAttributes}>
      <S.Wrapper icon={icon} color={color} size={size}>
        {icon ? <S.ShortCutIcon color={color} component={icon} /> : children}
      </S.Wrapper>
    </S.ShortCutWrapper>
  );
};
export default ShortCuts;
