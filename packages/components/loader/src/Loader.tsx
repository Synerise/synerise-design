import * as React from 'react';
import { LoaderProps } from './Loader.types';
import * as S from './Loader.styles';

const Loader: React.FC<LoaderProps> = ({
  size = 'M',
  label,
  labelPosition = 'right',
  color = 'blue',
  percent,
  percentFormatter,
}) => {
  return (
    <S.LoaderWrapper className="ds-loader" labelPosition={labelPosition}>
      <S.Wrapper size={size}>
        <S.Loader size={size} color={color} />
      </S.Wrapper>
      <S.TextWrapper>
        {label}
        {percentFormatter && <S.PercentWrapper>{percentFormatter(percent)}</S.PercentWrapper>}
      </S.TextWrapper>
    </S.LoaderWrapper>
  );
};
export default Loader;
