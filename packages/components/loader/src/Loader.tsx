import * as React from 'react';
import { LoaderProps } from './Loader.types';
import * as S from './Loader.styles';

const Loader: React.FC<LoaderProps> = ({
  size = 'M',
  label,
  labelPosition = 'right',
  color = 'grey',
  percent,
  percentFormatter,
  text,
  fontSize,
  mode,
}) => {
  return (
    <S.LoaderWrapper mode={mode} className="ds-loader" labelPosition={labelPosition}>
      <S.Wrapper size={size}>
        <S.Loader size={size} color={color} />
      </S.Wrapper>
      {text && <S.HeaderWrapper fontSize={fontSize}>{text}</S.HeaderWrapper>}
      <S.TextWrapper size={size} labelPosition={labelPosition}>
        {label}
        {percentFormatter && <S.PercentWrapper>{percentFormatter(percent)}</S.PercentWrapper>}
      </S.TextWrapper>
    </S.LoaderWrapper>
  );
};
export default Loader;
