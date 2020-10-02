import * as React from 'react';
import { LoaderProps } from './Loader.types';
import * as S from './Loader.styles';

const Loader: React.FC<LoaderProps> = ({ size, textLoader, elementsPosition = 'right' }) => {
  console.log(elementsPosition);
  return (
    <S.LoaderWrapper elementsPosition={elementsPosition}>
      <S.Wrapper size={size}>
        <S.Loader size={size} />
      </S.Wrapper>
      <S.TextWrapper>{textLoader}</S.TextWrapper>
    </S.LoaderWrapper>
  );
};
export default Loader;
