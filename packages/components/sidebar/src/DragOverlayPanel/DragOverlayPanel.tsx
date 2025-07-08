import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { AngleDownS, AngleUpS, DragHandleM } from '@synerise/ds-icon';

import * as S from '../Sidebar.styles';
import { type PanelProps } from '../Sidebar.types';

export const DragOverlayPanel = ({
  header,
  children,
  id,
  isActive,
  forceRender,
}: PanelProps) => {
  return (
    <S.DragOverlay key={`sidebar-drag-overlay-${id}`}>
      <S.DragOverlayHeader>
        <S.SidebarHeader>
          <span>{header}</span>
          <S.SidebarHandle data-testid="ds-sidebar-header-handle">
            <Icon
              color={theme.palette['grey-400']}
              component={<DragHandleM />}
            />
          </S.SidebarHandle>
          <S.ExpandIcon>
            <Icon
              color={theme.palette['grey-600']}
              component={isActive ? <AngleUpS /> : <AngleDownS />}
            />
          </S.ExpandIcon>
        </S.SidebarHeader>
      </S.DragOverlayHeader>
      {(isActive || forceRender) && (
        <S.DragOverlayContent>
          <S.SidebarContentWrapper>{children}</S.SidebarContentWrapper>
        </S.DragOverlayContent>
      )}
    </S.DragOverlay>
  );
};
