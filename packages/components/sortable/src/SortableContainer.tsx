import React, { useMemo, useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToHorizontalAxis } from '@dnd-kit/modifiers';

import { RawBaseItem, SortableContainerProps } from './Sortable.types';

export const SortableContainer = <ItemType extends RawBaseItem>({
  items,
  onOrderChange,
  onDragStart,
  onDragEnd,
  axis,
  children,
  ...props
}: SortableContainerProps<ItemType>) => {
  const [order, setOrder] = useState<Array<ItemType>>(items);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = order.findIndex(item => item.id === active.id);
      const newIndex = order.findIndex(item => item.id === over?.id);
      const updatedOrder = arrayMove(order, oldIndex, newIndex);
      setOrder(updatedOrder);
      onOrderChange?.(updatedOrder);
    }
    onDragEnd && onDragEnd(event);
  };
  const handleDragStart = (event: DragStartEvent) => {
    onDragStart && onDragStart(event);
  };

  useEffect(() => {
    setOrder(items);
  }, [items]);

  const contextModifiers = useMemo(() => {
    if (axis === 'x') {
      return [restrictToHorizontalAxis];
    }
    if (axis === 'y') {
      return [restrictToVerticalAxis];
    }
    return [];
  }, [axis]);

  const sortingStrategy = useMemo(() => {
    if (axis === 'x') {
      return horizontalListSortingStrategy;
    }
    if (axis === 'y') {
      return verticalListSortingStrategy;
    }
    return rectSortingStrategy;
  }, [axis]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={contextModifiers}
      {...props}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={order} strategy={sortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContainer;
