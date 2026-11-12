import React from 'react';

import * as S from './Loader.styles';
import type { LoaderProps } from './Loader.types';

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
      className={className ? `ds-loader ${className}` : 'ds-loader'}
      labelPosition={labelPosition}
    >
      <S.Wrapper className="ds-loader-spinner-wrapper" size={size}>
        <S.Loader className="ds-loader-spinner" size={size} color={color} />
      </S.Wrapper>
      {text && (
        <S.HeaderWrapper className="ds-loader-header" fontSize={fontSize}>
          {text}
        </S.HeaderWrapper>
      )}
      <S.TextWrapper
        className="ds-loader-label"
        size={size}
        labelPosition={labelPosition}
      >
        {label}
        {percentFormatter && (
          <S.PercentWrapper className="ds-loader-percent">
            {percentFormatter(percent)}
          </S.PercentWrapper>
        )}
      </S.TextWrapper>
    </S.LoaderWrapper>
  );
};
export default Loader;
