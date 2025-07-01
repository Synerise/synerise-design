import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { DragOverlay, type DragStartEvent } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import { type BaseItem, type SortableProps } from './Sortable.types';
import { SortableContainer } from './SortableContainer';
import { SortableItem } from './SortableItem';

export const Sortable = <ItemType extends BaseItem>({
  items,
  onOrderChange,
  ItemComponent,
  axis,
  placeholderCss,
}: SortableProps<ItemType>) => {
  const [order, setOrder] = useState<Array<ItemType>>(items);
  const [activeItem, setActiveItem] = useState<ItemType | undefined>();
  const sortableId = useMemo(() => uuid(), []);

  const handleDragEnd = () => {
    setActiveItem(undefined);
  };
  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem(items.find((item) => item.id === event.active.id));
  };

  const handleOrderChange = (newOrder: Array<ItemType>) => {
    onOrderChange?.(newOrder);
    setOrder(newOrder);
  };

  useEffect(() => {
    setOrder(items);
  }, [items]);

  return (
    <SortableContainer
      axis={axis}
      items={items}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onOrderChange={handleOrderChange}
    >
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
    </SortableContainer>
  );
};

export default Sortable;
