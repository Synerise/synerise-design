import React, { useEffect, useState } from 'react';

import { arrayMove, useDndMonitor } from '@synerise/ds-sortable';

import { ExpressionItem } from './ExpressionItem';
import type { ExpressionItemProps } from './ExpressionItem.types';

export const DraggableExpressionItem = ({
  expressionsOrder,
  expression,
  index: sortableIndex,
  ...rest
}: ExpressionItemProps & { index?: number }) => {
  const [dragIndex, setDragIndex] = useState(
    expressionsOrder.indexOf(expression.id),
  );

  useEffect(() => {
    setDragIndex(expressionsOrder.indexOf(expression.id));
  }, [expressionsOrder, expression.id]);

  useDndMonitor({
    onDragMove: (event) => {
      if (event.over?.data.current?.sortable?.index !== undefined) {
        const tempOrder = arrayMove(
          expressionsOrder,
          event.active.data.current?.sortable?.index,
          event.over?.data.current?.sortable?.index,
        );
        setDragIndex(tempOrder.indexOf(expression.id));
      }
    },
  });
  return (
    <ExpressionItem
      isDragOverlay={sortableIndex === -1}
      dragIndex={dragIndex}
      expression={expression}
      expressionsOrder={expressionsOrder}
      {...rest}
    />
  );
};
