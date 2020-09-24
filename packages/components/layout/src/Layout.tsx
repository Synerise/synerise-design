import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import { AngleLeftS, AngleRightS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './Layout.styles';
import { LayoutProps } from './Layout.types';

const Layout: React.FC<LayoutProps> = props => {
  const { header, left, right, children, className, styles, subheader } = props;
  const [leftSidebarOpened, setLeftSidebarOpened] = React.useState(false);
  const [rightSidebarOpened, setRightSidebarOpened] = React.useState(false);
  return (
    <S.LayoutContainer className={`ds-layout ${className || ''}`}>
      {header ? <S.LayoutHeader className="ds-layout__header">{header}</S.LayoutHeader> : null}
      <S.LayoutBody>
        <>
          {left ? (
            <S.LayoutSidebarWrapper opened={leftSidebarOpened}>
              <S.LayoutSidebar className="ds-layout__sidebar" style={styles && styles.left}>
                <Scrollbar absolute>
                  <S.LayoutSidebarInner style={styles && styles.leftInner}>{left}</S.LayoutSidebarInner>
                </Scrollbar>
              </S.LayoutSidebar>
              <S.SidebarButton onClick={(): void => setLeftSidebarOpened(!leftSidebarOpened)}>
                <Icon component={<AngleRightS />} color={theme.palette.white} />
              </S.SidebarButton>
            </S.LayoutSidebarWrapper>
          ) : null}
        </>
        <S.LayoutMain className="ds-layout__main" data-popup-container style={styles && styles.main}>
          <S.LayoutSubheader>{subheader}</S.LayoutSubheader>
          <Scrollbar absolute>
            <S.LayoutMainInner style={styles && styles.mainInner}>{children}</S.LayoutMainInner>
          </Scrollbar>
        </S.LayoutMain>
        <>
          {right ? (
            <S.LayoutSidebarWrapper opened={rightSidebarOpened} isRight>
              <S.LayoutSidebar className="ds-layout__sidebar ds-layout__sidebar--right" style={styles && styles.right}>
                <Scrollbar absolute>
                  <S.LayoutSidebarInner style={styles && styles.rightInner}>{right}</S.LayoutSidebarInner>
                </Scrollbar>
              </S.LayoutSidebar>
              <S.SidebarButton onClick={(): void => setRightSidebarOpened(!rightSidebarOpened)} isRight>
                <Icon component={<AngleLeftS />} color={theme.palette.white} />
              </S.SidebarButton>
            </S.LayoutSidebarWrapper>
          ) : null}
        </>
      </S.LayoutBody>
    </S.LayoutContainer>
  );
};

export default Layout;
