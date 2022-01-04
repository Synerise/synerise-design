import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import { AngleLeftS, AngleRightS, CloseS } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { usePrevious } from '@synerise/ds-utils';
import * as S from './Layout.styles';
import { LayoutProps } from './Layout.types';

const Layout: React.FC<LayoutProps> = ({
  header,
  left,
  right,
  children,
  className,
  styles,
  subheader,
  leftOpened,
  rightOpened,
  fullPage = false,
  leftOpenedWidth = 320,
  rightOpenedWidth = 320,
}) => {
  const previousLeftOpened = usePrevious(leftOpened);
  const previousRightOpened = usePrevious(rightOpened);
  const [leftSidebarOpened, setLeftSidebarOpened] = React.useState(Boolean(leftOpened));
  const [rightSidebarOpened, setRightSidebarOpened] = React.useState(Boolean(rightOpened));

  React.useEffect(() => {
    if (leftOpened !== previousLeftOpened) {
      setLeftSidebarOpened(Boolean(leftOpened));
    }
    if (rightOpened !== previousRightOpened) {
      setRightSidebarOpened(Boolean(rightOpened));
    }
  }, [leftOpened, rightOpened, previousLeftOpened, previousRightOpened]);

  return (
    <S.LayoutContainer className={`ds-layout ${className || ''}`}>
      {header ? <S.LayoutHeader className="ds-layout__header">{header}</S.LayoutHeader> : null}
      <S.LayoutContent>
        <S.LayoutBody>
          <>
            {left ? (
              <S.LayoutSidebarWrapper opened={leftSidebarOpened} openedWidth={leftOpenedWidth}>
                <S.LayoutSidebar
                  className="ds-layout__sidebar"
                  style={styles && styles.left}
                  opened={leftSidebarOpened}
                  openedWidth={leftOpenedWidth}
                >
                  <Scrollbar absolute>
                    <S.LayoutSidebarInner style={styles && styles.leftInner}>{left}</S.LayoutSidebarInner>
                  </Scrollbar>
                </S.LayoutSidebar>
                <S.SidebarButton
                  withSubheader={Boolean(subheader)}
                  onClick={(): void => setLeftSidebarOpened(!leftSidebarOpened)}
                  opened={leftSidebarOpened}
                  bothOpened={leftSidebarOpened && rightSidebarOpened}
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
              <S.LayoutMainInner fullPage={fullPage} style={styles && styles.mainInner}>
                {children}
              </S.LayoutMainInner>
            </Scrollbar>
          </S.LayoutMain>
          <>
            {right ? (
              <S.LayoutSidebarWrapper opened={rightSidebarOpened} right openedWidth={leftOpenedWidth}>
                <S.LayoutSidebar
                  className="ds-layout__sidebar ds-layout__sidebar--right"
                  style={styles && styles.right}
                  opened={rightSidebarOpened}
                  openedWidth={rightOpenedWidth}
                >
                  <Scrollbar absolute>
                    <S.LayoutSidebarInner style={styles && styles.rightInner}>{right}</S.LayoutSidebarInner>
                  </Scrollbar>
                </S.LayoutSidebar>
                <S.SidebarButton
                  withSubheader={Boolean(subheader)}
                  onClick={(): void => setRightSidebarOpened(!rightSidebarOpened)}
                  right
                  opened={rightSidebarOpened}
                  bothOpened={leftSidebarOpened && rightSidebarOpened}
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
