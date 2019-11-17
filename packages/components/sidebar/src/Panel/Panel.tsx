import * as React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Icon from '@synerise/ds-icon/dist/Icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { DragHandleM } from '@synerise/ds-icon/dist/icons';
import { XYCoord } from 'dnd-core';
import { PanelProps } from '../Sidebar.types';
import { SidebarContext } from '../Sidebar.context';
import * as S from '../Sidebar.styles';

export const Panel: React.FC<PanelProps> = ({ header, children, id, ...props }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const context = React.useContext(SidebarContext);
  const { order } = context || {};

  const isDragDrop = context && !!order;
  const index = isDragDrop && context ? order.indexOf(id) : 0;

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
      const hoverBoundingRect = ref.current!.getBoundingClientRect();
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
    <S.AntdPanel
      style={{ opacity: isDragging ? '0' : '1' }}
      header={
        <S.SidebarHeader>
          <span>{header}</span>
          {isDragDrop && (
            <S.SidebarHandle ref={ref}>
              <Icon color={theme.palette['grey-400']} component={<DragHandleM />} />
            </S.SidebarHandle>
          )}
        </S.SidebarHeader>
      }
      key={id}
      {...props}
    >
      {children}
    </S.AntdPanel>
  );
};

export default Panel;
