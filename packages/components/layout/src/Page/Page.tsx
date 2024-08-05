import React, { useMemo } from 'react';
import * as S from './Page.styles';

type PageProps = {
  navBar?: React.ReactNode;
  appMenu?: React.Component;
  children: JSX.Element;
  className?: string;
};

const Page = ({ navBar, appMenu, children, className }: PageProps) => {
  const renderAppMenu = useMemo(() => {
    if (appMenu) {
      // @ts-ignore
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
        <S.MenuWrapper withAppMenu={Boolean(appMenu)}>{renderAppMenu}</S.MenuWrapper>
        <S.LayoutWrapper withAppMenu={Boolean(appMenu)}>{children}</S.LayoutWrapper>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};

export default Page;
