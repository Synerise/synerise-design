import React from 'react';

import Scrollbar from '@synerise/ds-scrollbar';

import * as S from './Layout.styles';
import type * as T from './Layout.types';
import { Sidebar } from './Sidebar/Sidebar';

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
  leftSidebarWithScrollbar = true,
  rightSidebarWithScrollbar = true,
  mainSidebarWithDnd = false,
}: T.LayoutProps) => {
  const leftSidebarWidth = left?.width || DEFAULT_SIDEBAR_WIDTH;
  const rightSidebarWidth = right?.width || DEFAULT_SIDEBAR_WIDTH;
  const showLeftSidebar = left?.opened || !renderLeftSidebarControls;
  const showRightSidebar = right?.opened || !renderRightSidebarControls;

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
          {left && (
            <Sidebar
              opened={showLeftSidebar}
              bothOpened={Boolean(left?.opened && right?.opened)}
              openedWidth={leftSidebarWidth}
              animationDisabled={!!sidebarAnimationDisabled}
              withControlButton={!!leftSidebarHasControls}
              outerStyles={styles?.left}
              innerStyles={styles?.leftInner}
              withScrollbar={leftSidebarWithScrollbar}
              scrollWithDnd={leftSidebarWithDnd}
              renderControls={renderLeftSidebarControls}
              withSubheader={Boolean(subheader)}
              onChange={left?.onChange}
            >
              {left.content}
            </Sidebar>
          )}

          <S.LayoutMain
            className="ds-layout__main"
            data-popup-container
            style={styles && styles.main}
          >
            <S.LayoutSubheader>{subheader}</S.LayoutSubheader>
            {mainColumnInner}
          </S.LayoutMain>
          {right && (
            <Sidebar
              opened={showRightSidebar}
              side="right"
              bothOpened={Boolean(left?.opened && right?.opened)}
              openedWidth={rightSidebarWidth}
              animationDisabled={!!sidebarAnimationDisabled}
              withControlButton={!!rightSidebarHasControls}
              outerStyles={styles?.right}
              innerStyles={styles?.rightInner}
              withScrollbar={rightSidebarWithScrollbar}
              scrollWithDnd={rightSidebarWithDnd}
              renderControls={renderRightSidebarControls}
              withSubheader={Boolean(subheader)}
              onChange={right?.onChange}
            >
              {right.content}
            </Sidebar>
          )}
        </S.LayoutBody>
      </S.LayoutContent>
    </S.LayoutContainer>
  );
};

export default Layout;
