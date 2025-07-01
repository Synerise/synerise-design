import React from 'react';

import * as S from './Loader.styles';
import { type LoaderProps } from './Loader.types';

const Loader = ({
  size = 'M',
  label,
  labelPosition = 'right',
  color = 'grey',
  percent,
  percentFormatter,
  text,
  fontSize,
  mode,
  className,
}: LoaderProps) => {
  return (
    <S.LoaderWrapper
      mode={mode}
      className={`ds-loader ${className}`}
      labelPosition={labelPosition}
    >
      <S.Wrapper size={size}>
        <S.Loader size={size} color={color} />
      </S.Wrapper>
      {text && <S.HeaderWrapper fontSize={fontSize}>{text}</S.HeaderWrapper>}
      <S.TextWrapper size={size} labelPosition={labelPosition}>
        {label}
        {percentFormatter && (
          <S.PercentWrapper>{percentFormatter(percent)}</S.PercentWrapper>
        )}
      </S.TextWrapper>
    </S.LoaderWrapper>
  );
};
export default Loader;
