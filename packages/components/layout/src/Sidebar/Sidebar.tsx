import React, { type CSSProperties, type ReactNode, useMemo } from 'react';

import { useTheme } from '@synerise/ds-core';
import { AngleLeftS, AngleRightS, CloseS } from '@synerise/ds-icon';
import Scrollbar from '@synerise/ds-scrollbar';

import * as S from '../Layout.styles';

type SidebarProps = {
  opened: boolean;
  bothOpened: boolean;
  withScrollbar: boolean;
  withSubheader: boolean;
  scrollWithDnd: boolean;
  openedWidth: number;
  animationDisabled: boolean;
  withControlButton: boolean;
  outerStyles?: CSSProperties;
  innerStyles?: CSSProperties;
  children?: ReactNode;
  renderControls?: (() => ReactNode) | boolean;
  onChange?: (isOpen: boolean) => void;
  side?: 'right' | 'left';
};
export const Sidebar = ({
  opened,
  openedWidth,
  animationDisabled,
  withControlButton,
  innerStyles,
  outerStyles,
  scrollWithDnd,
  children,
  withScrollbar,
  renderControls,
  withSubheader,
  side,
  bothOpened,
  onChange,
}: SidebarProps) => {
  const theme = useTheme();
  const contentWithScrollbar = useMemo(() => {
    const content = (
      <S.LayoutSidebarInner style={innerStyles}>
        {children}
      </S.LayoutSidebarInner>
    );
    return withScrollbar ? (
      <Scrollbar absolute withDnd={scrollWithDnd}>
        {content}
      </Scrollbar>
    ) : (
      content
    );
  }, [children, scrollWithDnd, innerStyles, withScrollbar]);

  const handleChange = () => onChange?.(!opened);
  return (
    <S.LayoutSidebarWrapper
      opened={opened}
      right={side === 'right'}
      openedWidth={openedWidth}
      animationDisabled={animationDisabled}
      hasControlButton={withControlButton}
    >
      <S.LayoutSidebar
        className={`ds-layout__sidebar ${side === 'right' && 'ds-layout__sidebar--right'}`}
        style={outerStyles}
        opened={opened}
        openedWidth={openedWidth}
        animationDisabled={animationDisabled}
      >
        {contentWithScrollbar}
      </S.LayoutSidebar>
      {(typeof renderControls === 'function' && renderControls()) ||
        (renderControls === true && (
          <S.SidebarButton
            withSubheader={withSubheader}
            onClick={handleChange}
            opened={opened}
            right={side === 'right'}
            bothOpened={bothOpened}
          >
            <S.ArrowIcon
              component={side === 'right' ? <AngleLeftS /> : <AngleRightS />}
              color={theme.palette.white}
            />
            <S.CloseIcon component={<CloseS />} color={theme.palette.white} />
          </S.SidebarButton>
        ))}
    </S.LayoutSidebarWrapper>
  );
};
