import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import { AngleLeftS, AngleRightS, CloseS } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './Layout.styles';
import * as T from './Layout.types';

const DEFAULT_SIDEBAR_WIDTH = 320;

const Layout: React.FC<T.LayoutProps> = ({
  header,
  left,
  right,
  children,
  className,
  styles,
  subheader,
  fullPage = false,
  sidebarAnimationDisabled,
  renderLeftSidebarControls = false,
  renderRightSidebarControls = false,
}) => {
  const leftSidebarWidth = React.useMemo(() => left?.width || DEFAULT_SIDEBAR_WIDTH, [left]);
  const rightSidebarWidth = React.useMemo(() => right?.width || DEFAULT_SIDEBAR_WIDTH, [right]);
  const showLeftSidebar = React.useMemo(
    () => left?.opened || !renderLeftSidebarControls,
    [left, renderLeftSidebarControls]
  );
  const showRightSidebar = React.useMemo(
    () => right?.opened || !renderRightSidebarControls,
    [right, renderRightSidebarControls]
  );

  return (
    <S.LayoutContainer className={`ds-layout ${className || ''}`}>
      {header ? <S.LayoutHeader className="ds-layout__header">{header}</S.LayoutHeader> : null}
      <S.LayoutContent>
        <S.LayoutBody>
          <>
            {left ? (
              <S.LayoutSidebarWrapper
                opened={showLeftSidebar}
                openedWidth={leftSidebarWidth}
                animationDisabled={!!sidebarAnimationDisabled}
              >
                <S.LayoutSidebar
                  className="ds-layout__sidebar"
                  style={styles && styles.left}
                  opened={showLeftSidebar}
                  openedWidth={leftSidebarWidth}
                  animationDisabled={!!sidebarAnimationDisabled}
                >
                  <Scrollbar absolute>
                    <S.LayoutSidebarInner style={styles && styles.leftInner}>{left?.content}</S.LayoutSidebarInner>
                  </Scrollbar>
                </S.LayoutSidebar>
                {(typeof renderLeftSidebarControls === 'function' && renderLeftSidebarControls()) ||
                  (renderLeftSidebarControls === true && (
                    <S.SidebarButton
                      withSubheader={Boolean(subheader)}
                      onClick={(): void => left?.onChange(!left?.opened)}
                      opened={!!left?.opened}
                      bothOpened={left?.opened && right?.opened}
                    >
                      <S.ArrowIcon component={<AngleRightS />} color={theme.palette.white} />
                      <S.CloseIcon component={<CloseS />} color={theme.palette.white} />
                    </S.SidebarButton>
                  ))}
              </S.LayoutSidebarWrapper>
            ) : null}
          </>
          <S.LayoutMain
            className="ds-layout__main"
            data-popup-container
            style={styles && styles.main}
            leftOpened={showLeftSidebar}
            rightOpened={showRightSidebar}
            leftSidebarWidth={leftSidebarWidth}
            rightSidebarWidth={rightSidebarWidth}
          >
            <S.LayoutSubheader>{subheader}</S.LayoutSubheader>
            <Scrollbar absolute>
              <S.LayoutMainInner fullPage={fullPage} style={styles && styles.mainInner}>
                {children}
              </S.LayoutMainInner>
            </Scrollbar>
          </S.LayoutMain>
          <>
            {right ? (
              <S.LayoutSidebarWrapper
                opened={showRightSidebar}
                right
                openedWidth={rightSidebarWidth}
                animationDisabled={!!sidebarAnimationDisabled}
              >
                <S.LayoutSidebar
                  className="ds-layout__sidebar ds-layout__sidebar--right"
                  style={styles && styles.right}
                  opened={showRightSidebar}
                  openedWidth={rightSidebarWidth}
                  animationDisabled={!!sidebarAnimationDisabled}
                >
                  <Scrollbar absolute>
                    <S.LayoutSidebarInner style={styles && styles.rightInner}>{right?.content}</S.LayoutSidebarInner>
                  </Scrollbar>
                </S.LayoutSidebar>
                {(typeof renderRightSidebarControls === 'function' && renderRightSidebarControls()) ||
                  (renderRightSidebarControls === true && (
                    <S.SidebarButton
                      withSubheader={Boolean(subheader)}
                      onClick={(): void => right?.onChange(!right?.opened)}
                      right
                      opened={!!right?.opened}
                      bothOpened={left?.opened && right?.opened}
                    >
                      <S.ArrowIcon component={<AngleLeftS />} color={theme.palette.white} />
                      <S.CloseIcon component={<CloseS />} color={theme.palette.white} />
                    </S.SidebarButton>
                  ))}
              </S.LayoutSidebarWrapper>
            ) : null}
          </>
        </S.LayoutBody>
      </S.LayoutContent>
    </S.LayoutContainer>
  );
};

export default Layout;
