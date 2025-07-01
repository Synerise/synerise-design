import React, { useMemo } from 'react';

import { theme } from '@synerise/ds-core';
import { AngleLeftS, AngleRightS, CloseS } from '@synerise/ds-icon';
import Scrollbar from '@synerise/ds-scrollbar';

import * as S from './Layout.styles';
import type * as T from './Layout.types';

const DEFAULT_SIDEBAR_WIDTH = 320;

const Layout = ({
  header,
  left,
  right,
  children,
  className,
  styles,
  subheader,
  fullPage = false,
  nativeScroll,
  nativeScrollRef,
  fillViewport,
  viewportTopOffset,
  sidebarAnimationDisabled,
  renderLeftSidebarControls = false,
  renderRightSidebarControls = false,
  leftSidebarWithDnd = false,
  rightSidebarWithDnd = false,
  mainSidebarWithDnd = false,
}: T.LayoutProps) => {
  const leftSidebarWidth = useMemo(
    () => left?.width || DEFAULT_SIDEBAR_WIDTH,
    [left],
  );
  const rightSidebarWidth = useMemo(
    () => right?.width || DEFAULT_SIDEBAR_WIDTH,
    [right],
  );
  const showLeftSidebar = useMemo(
    () => left?.opened || !renderLeftSidebarControls,
    [left, renderLeftSidebarControls],
  );
  const showRightSidebar = useMemo(
    () => right?.opened || !renderRightSidebarControls,
    [right, renderRightSidebarControls],
  );

  const mainColumnInner = nativeScroll ? (
    <S.LayoutMainInner
      fullPage={fullPage}
      style={styles && styles.mainInner}
      ref={nativeScrollRef}
    >
      {children}
    </S.LayoutMainInner>
  ) : (
    <Scrollbar absolute withDnd={mainSidebarWithDnd}>
      <S.LayoutMainInner fullPage={fullPage} style={styles && styles.mainInner}>
        {children}
      </S.LayoutMainInner>
    </Scrollbar>
  );

  const leftSidebarHasControls = left && renderLeftSidebarControls;
  const rightSidebarHasControls = right && renderRightSidebarControls;

  return (
    <S.LayoutContainer
      fillViewport={fillViewport}
      viewportTopOffset={viewportTopOffset}
      nativeScroll={nativeScroll}
      className={`ds-layout ${className || ''}`}
    >
      {header ? (
        <S.LayoutHeader className="ds-layout__header">{header}</S.LayoutHeader>
      ) : null}
      <S.LayoutContent>
        <S.LayoutBody
          allowOverflow={!leftSidebarHasControls || !rightSidebarHasControls}
        >
          <>
            {left ? (
              <S.LayoutSidebarWrapper
                opened={showLeftSidebar}
                openedWidth={leftSidebarWidth}
                animationDisabled={!!sidebarAnimationDisabled}
                hasControlButton={!!leftSidebarHasControls}
              >
                <S.LayoutSidebar
                  className="ds-layout__sidebar"
                  style={styles && styles.left}
                  opened={showLeftSidebar}
                  openedWidth={leftSidebarWidth}
                  animationDisabled={!!sidebarAnimationDisabled}
                >
                  <Scrollbar absolute withDnd={leftSidebarWithDnd}>
                    <S.LayoutSidebarInner style={styles && styles.leftInner}>
                      {left?.content}
                    </S.LayoutSidebarInner>
                  </Scrollbar>
                </S.LayoutSidebar>
                {(typeof renderLeftSidebarControls === 'function' &&
                  renderLeftSidebarControls()) ||
                  (renderLeftSidebarControls === true && (
                    <S.SidebarButton
                      withSubheader={Boolean(subheader)}
                      onClick={(): void => left?.onChange(!left?.opened)}
                      opened={!!left?.opened}
                      bothOpened={left?.opened && right?.opened}
                    >
                      <S.ArrowIcon
                        component={<AngleRightS />}
                        color={theme.palette.white}
                      />
                      <S.CloseIcon
                        component={<CloseS />}
                        color={theme.palette.white}
                      />
                    </S.SidebarButton>
                  ))}
              </S.LayoutSidebarWrapper>
            ) : null}
          </>
          <S.LayoutMain
            className="ds-layout__main"
            data-popup-container
            style={styles && styles.main}
          >
            <S.LayoutSubheader>{subheader}</S.LayoutSubheader>
            {mainColumnInner}
          </S.LayoutMain>
          <>
            {right ? (
              <S.LayoutSidebarWrapper
                opened={showRightSidebar}
                right
                openedWidth={rightSidebarWidth}
                animationDisabled={!!sidebarAnimationDisabled}
                hasControlButton={!!rightSidebarHasControls}
              >
                <S.LayoutSidebar
                  className="ds-layout__sidebar ds-layout__sidebar--right"
                  style={styles && styles.right}
                  opened={showRightSidebar}
                  openedWidth={rightSidebarWidth}
                  animationDisabled={!!sidebarAnimationDisabled}
                >
                  <Scrollbar absolute withDnd={rightSidebarWithDnd}>
                    <S.LayoutSidebarInner style={styles && styles.rightInner}>
                      {right?.content}
                    </S.LayoutSidebarInner>
                  </Scrollbar>
                </S.LayoutSidebar>
                {(typeof renderRightSidebarControls === 'function' &&
                  renderRightSidebarControls()) ||
                  (renderRightSidebarControls === true && (
                    <S.SidebarButton
                      withSubheader={Boolean(subheader)}
                      onClick={(): void => right?.onChange(!right?.opened)}
                      right
                      opened={!!right?.opened}
                      bothOpened={left?.opened && right?.opened}
                    >
                      <S.ArrowIcon
                        component={<AngleLeftS />}
                        color={theme.palette.white}
                      />
                      <S.CloseIcon
                        component={<CloseS />}
                        color={theme.palette.white}
                      />
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
