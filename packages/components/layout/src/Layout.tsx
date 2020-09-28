import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import { AngleLeftS, AngleRightS, CloseS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './Layout.styles';
import { LayoutProps } from './Layout.types';

const Layout: React.FC<LayoutProps> = props => {
  const { header, left, right, children, className, styles, subheader, leftOpened, rightOpened } = props;
  const [leftSidebarOpened, setLeftSidebarOpened] = React.useState(leftOpened);
  const [rightSidebarOpened, setRightSidebarOpened] = React.useState(rightOpened);
  return (
    <S.LayoutContainer className={`ds-layout ${className || ''}`}>
      {header ? <S.LayoutHeader className="ds-layout__header">{header}</S.LayoutHeader> : null}
      <S.LayoutContent>
        <S.LayoutBody>
          <>
            {left ? (
              <S.LayoutSidebarWrapper opened={leftSidebarOpened}>
                <S.LayoutSidebar
                  className="ds-layout__sidebar"
                  style={styles && styles.left}
                  opened={leftSidebarOpened}
                >
                  <Scrollbar absolute>
                    <S.LayoutSidebarInner style={styles && styles.leftInner}>{left}</S.LayoutSidebarInner>
                  </Scrollbar>
                </S.LayoutSidebar>
                <S.SidebarButton
                  onClick={(): void => setLeftSidebarOpened(!leftSidebarOpened)}
                  opened={leftSidebarOpened}
                >
                  <S.ArrowIcon component={<AngleRightS />} color={theme.palette.white} />
                  <S.CloseIcon component={<CloseS />} color={theme.palette.white} />
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
              <S.LayoutSidebarWrapper opened={rightSidebarOpened} right>
                <S.LayoutSidebar
                  className="ds-layout__sidebar ds-layout__sidebar--right"
                  style={styles && styles.right}
                  opened={rightSidebarOpened}
                >
                  <Scrollbar absolute>
                    <S.LayoutSidebarInner style={styles && styles.rightInner}>{right}</S.LayoutSidebarInner>
                  </Scrollbar>
                </S.LayoutSidebar>
                <S.SidebarButton
                  onClick={(): void => setRightSidebarOpened(!rightSidebarOpened)}
                  right
                  opened={rightSidebarOpened}
                >
                  <S.ArrowIcon component={<AngleLeftS />} color={theme.palette.white} />
                  <S.CloseIcon component={<CloseS />} color={theme.palette.white} />
                </S.SidebarButton>
              </S.LayoutSidebarWrapper>
            ) : null}
          </>
        </S.LayoutBody>
      </S.LayoutContent>
    </S.LayoutContainer>
  );
};

export default Layout;
