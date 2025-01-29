import React, { useContext, useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import Icon, { DragHandleM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';

import { PanelProps, DraggablePanelProps } from '../Sidebar.types';
import { SidebarContext } from '../Sidebar.context';
import * as S from '../Sidebar.styles';

const DraggablePanel = ({ id, context, order, children }: DraggablePanelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const index = order ? order.indexOf(id) : 0;

  const [, drop] = useDrop({
    accept: 'PANEL',
    hover: (prop: { index: number; type: string }, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = prop.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverMonitor = monitor;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect.bottom - hoverBoundingRect.top;
      const clientOffset = hoverMonitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      context && context.setOrder(dragIndex, hoverIndex);
      hoverMonitor.getItem().index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'PANEL', index },
    begin: () => ({
      ...{ type: 'PANEL', index },
    }),
    isDragging: monitor => monitor.getItem().index === index,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <S.PanelWrapper ref={ref} style={{ opacity: isDragging ? '0' : '1' }}>
      {children}
    </S.PanelWrapper>
  );
};

export const Panel = ({ header, children, id, ...props }: PanelProps) => {
  const context = useContext(SidebarContext);
  const { order } = context || {};
  const isDragDrop = context && !!order;

  const panelContent = useMemo(
    () => (
      <S.AntdPanel
        header={
          <S.SidebarHeader>
            <span data-testid={`header-${id}`}>{header}</span>
            {isDragDrop && (
              <S.SidebarHandle>
                <Icon color={theme.palette['grey-400']} component={<DragHandleM />} />
              </S.SidebarHandle>
            )}
          </S.SidebarHeader>
        }
        {...props}
        key={id}
      >
        <S.SidebarContentWrapper>{children}</S.SidebarContentWrapper>
      </S.AntdPanel>
    ),
    [header, isDragDrop, id, props, children]
  );

  return isDragDrop ? (
    <DraggablePanel id={id} order={order} context={context}>
      {panelContent}
    </DraggablePanel>
  ) : (
    panelContent
  );
};

export default Panel;
