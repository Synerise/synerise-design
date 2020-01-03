import * as React from 'react';

import * as S from './AppHeader.styles';

export type AppHeaderProps = {
  logo: string;

  className?: string;
  title?: string;
  sideNodes: React.ReactNode[];
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
    <S.Container backgroundColor={backgroundColor} className={className}>
      <S.InnerContainer>
        <S.Main>
          <S.Logo src={logo} alt="" />

          {title &&
            <>
              <S.Seperator />
              <S.Title>{title}</S.Title>
            </>
          }
        </S.Main>

        {sideNodes &&
          <S.Aside>
            {sideNodes.map((node, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <S.Seperator />}
                {node}
              </React.Fragment>
            ))}
          </S.Aside>
        }
      </S.InnerContainer>
    </S.Container>
  );
};

AppHeader.defaultProps = {
  backgroundColor: 'blue',
};

export default AppHeader;
