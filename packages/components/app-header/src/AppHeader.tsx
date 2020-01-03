import * as React from 'react';

import * as S from './AppHeader.styles';

export type AppHeaderProps = {
  className?: string;
  logo: string;
  title?: string;
  backgroundColor?:
    | 'red'
    | 'blue'
    | 'green'
    | 'grey'
    | 'yellow'
    | 'pink'
    | 'mars'
    | 'orange'
    | 'fern'
    | 'cyan'
    | 'purple'
    | 'violet';
};

const AppHeader: React.FC<AppHeaderProps> = ({ title, logo, backgroundColor, className }) => {
  return (
    <S.Container backgroundColor={backgroundColor} className={className}>
      <S.InnerContainer>
        <S.Logo src={logo} alt="" />
        <S.Seperator />
        <S.Title>{title}</S.Title>
      </S.InnerContainer>
    </S.Container>
  );
};

AppHeader.defaultProps = {
  backgroundColor: 'blue',
};

export default AppHeader;
