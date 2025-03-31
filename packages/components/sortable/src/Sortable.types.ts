import type { ReactNode, ReactElement, ComponentType } from 'react';
import type { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type DragHandlePropType = DraggableAttributes & DraggableSyntheticListeners;

export type BaseItem = {
  id: string | number;
  dragHandleProps?: DragHandlePropType;
};

type WithIndex<T> = T & {
  index: number;
};

type ItemComponent<ItemType extends WithIndex<BaseItem>> =
  | ComponentType<ItemType>
  | ((props: ItemType) => ReactElement);

export type SortableItemProps<ItemType extends BaseItem> = WithHTMLAttributes<
  HTMLDivElement,
  {
    children?: ReactNode;
    id: string | number;
    index: number;
    component: ItemComponent<WithIndex<ItemType>>;
    data: ItemType;
    isDragged?: boolean;
  }
>;

export type SortableProps<ItemType extends BaseItem> = {
  items: ItemType[];
  axis?: 'x' | 'y';
  ItemComponent: ItemComponent<WithIndex<ItemType>>;
  onOrderChange?: (newOrder: ItemType[]) => void;
};
