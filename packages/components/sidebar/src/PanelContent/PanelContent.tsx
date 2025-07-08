import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { DragHandleM } from '@synerise/ds-icon';

import * as S from '../Sidebar.styles';
import { type PanelProps } from '../Sidebar.types';

export const PanelContent = ({
  header,
  children,
  id,
  draggable,
  dragHandleProps,
  ...props
}: PanelProps) => {
  return (
    <S.AntdPanel
      header={
        <S.SidebarHeader>
          <span data-testid={`header-${id}`}>{header}</span>
          {draggable && (
            <S.SidebarHandle
              data-testid="ds-sidebar-header-handle"
              {...dragHandleProps}
            >
              <Icon
                color={theme.palette['grey-400']}
                component={<DragHandleM />}
              />
            </S.SidebarHandle>
          )}
        </S.SidebarHeader>
      }
      key={id}
      isDragOverlay={id === '-1'}
      {...props}
    >
      <S.SidebarContentWrapper>{children}</S.SidebarContentWrapper>
    </S.AntdPanel>
  );
};
