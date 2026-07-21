import React from 'react';

import Icon, { DragHandleM } from '@synerise/ds-icon';

import CollapsePanel from '../Collapse/CollapsePanel';
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
    <CollapsePanel
      header={
        <S.SidebarHeader>
          <span data-testid={`header-${id}`}>{header}</span>
          {draggable && (
            <S.SidebarHandle
              data-testid="ds-sidebar-header-handle"
              {...dragHandleProps}
            >
              <Icon
                color="var(--ds-color-icon-base-muted)"
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
    </CollapsePanel>
  );
};
