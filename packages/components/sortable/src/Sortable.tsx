import React, { useMemo, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
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
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { restrictToVerticalAxis, restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

import { SortableItem } from './SortableItem';
import { SortableProps, BaseItem } from './Sortable.types';

export const Sortable = <ItemType extends BaseItem>({
  items,
  onOrderChange,
  ItemComponent,
  axis,
  placeholderCss,
}: SortableProps<ItemType>) => {
  const [order, setOrder] = useState<Array<ItemType>>(items);
  const [activeItem, setActiveItem] = useState<ItemType | undefined>();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortableId = useMemo(() => uuid(), []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setOrder(oldOrder => {
        const oldIndex = oldOrder.findIndex(item => item.id === active.id);
        const newIndex = oldOrder.findIndex(item => item.id === over?.id);
        const updatedOrder = arrayMove(oldOrder, oldIndex, newIndex);
        onOrderChange && onOrderChange(updatedOrder);
        return updatedOrder;
      });
    }
    setActiveItem(undefined);
  };
  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem(items.find(item => item.id === event.active.id));
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
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      modifiers={contextModifiers}
    >
      <SortableContext items={order} strategy={sortingStrategy}>
        {order.map((item, index) => (
          <SortableItem
            id={item.id}
            index={index}
            placeholderCss={placeholderCss}
            isDragged={activeItem?.id === item.id}
            key={`sortable-item-${sortableId}-${item.id}`}
            data={item}
            component={ItemComponent}
          />
        ))}
        <DragOverlay modifiers={[restrictToParentElement]}>
          {activeItem && <ItemComponent {...activeItem} index={-1} />}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};

export default Sortable;
