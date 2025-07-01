import React, { type ReactElement, type ReactNode, useMemo } from 'react';

import * as S from './Page.styles';

type PageProps = {
  navBar?: ReactNode;
  appMenu?: ReactElement;
  children: ReactNode;
  className?: string;
};

const Page = ({ navBar, appMenu, children, className }: PageProps) => {
  const renderAppMenu = useMemo(() => {
    if (appMenu) {
      return React.cloneElement(appMenu, {
        top: navBar ? 56 : 0,
      });
    }
    return null;
  }, [appMenu, navBar]);

  return (
    <S.PageContainer className={className}>
      {navBar}
      <S.ContentWrapper withNavBar={Boolean(navBar)}>
        <S.MenuWrapper withAppMenu={Boolean(appMenu)}>
          {renderAppMenu}
        </S.MenuWrapper>
        <S.LayoutWrapper withAppMenu={Boolean(appMenu)}>
          {children}
        </S.LayoutWrapper>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};

export default Page;
