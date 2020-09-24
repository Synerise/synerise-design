import * as React from 'react';
import * as S from './Page.styles';

type LayoutProps = {
  navBar?: React.ReactNode;
  appMenu?: React.Component;
  children: JSX.Element;
};

const Page: React.FC<LayoutProps> = ({ navBar, appMenu, children }) => {
  const renderAppMenu = React.useMemo(() => {
    if (appMenu) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return React.cloneElement(appMenu, {
        top: navBar ? 56 : 0,
      });
    }
    return null;
  }, [appMenu, navBar]);
  return (
    <S.PageContainer>
      {navBar}
      <S.ContentWrapper withNavBar={Boolean(navBar)}>
        <S.MenuWrapper withAppMenu={Boolean(appMenu)}>{renderAppMenu}</S.MenuWrapper>
        <S.LayoutWrapper withAppMenu={Boolean(appMenu)}>{children}</S.LayoutWrapper>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};

export default Page;
