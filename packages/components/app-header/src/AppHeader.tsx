import * as React from 'react';

import * as S from './AppHeader.styles';

export type SideNode = {
  id: string | number;
  render: React.ReactNode;
};

export type AppHeaderProps = {
  logo: string;

  className?: string;
  title?: string;
  sideNodes?: SideNode[];
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

const AppHeader: React.FC<AppHeaderProps> = ({ sideNodes, title, logo, backgroundColor, className }) => {
  return (
    <S.Container backgroundColor={backgroundColor} className={className} data-testid="header-container">
      <S.InnerContainer>
        <S.Main>
          <S.Logo src={logo} alt="" />

          {title && (
            <>
              <S.Seperator />
              <S.Title>{title}</S.Title>
            </>
          )}
        </S.Main>

        {sideNodes && (
          <S.Aside>
            {sideNodes.map(({ render, id }, index) => (
              <React.Fragment key={id}>
                {index !== 0 && <S.Seperator />}
                {render}
              </React.Fragment>
            ))}
          </S.Aside>
        )}
      </S.InnerContainer>
    </S.Container>
  );
};

AppHeader.defaultProps = {
  backgroundColor: 'blue',
};

export default AppHeader;
