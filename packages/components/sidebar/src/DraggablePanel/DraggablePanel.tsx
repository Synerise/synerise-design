import React from 'react';

import { CSS, useSortable } from '@synerise/ds-sortable';

import { PanelContent } from '../PanelContent/PanelContent';
import * as S from '../Sidebar.styles';
import { type PanelProps } from '../Sidebar.types';

export const DraggablePanel = ({ id, ...props }: PanelProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <S.DraggablePanelWrapper ref={setNodeRef} style={dragStyle}>
      <PanelContent
        id={id}
        {...props}
        draggable
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </S.DraggablePanelWrapper>
  );
};
