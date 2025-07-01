import React from 'react';

import { CSS, useSortable } from '@synerise/ds-sortable';

import Item from './Item';
import { type Props } from './Item.types';

export const DraggableItem = ({
  item,
  ...rest
}: Omit<Props, 'dragHandleProps'>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={dragStyle} ref={setNodeRef}>
      <Item
        dragHandleProps={{ ...attributes, ...listeners }}
        item={item}
        {...rest}
      />
    </div>
  );
};
