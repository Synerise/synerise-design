import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { Interpolation } from 'styled-components';

import type {
  DndContextProps,
  DraggableAttributes,
  DraggableSyntheticListeners,
} from '@dnd-kit/core';
import type { ThemeProps } from '@synerise/ds-core';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type DragHandlePropType = DraggableAttributes &
  DraggableSyntheticListeners;

export type RawBaseItem = {
  id: string | number;
};
export type BaseItem = RawBaseItem & {
  dragHandleProps?: DraggableAttributes & DraggableSyntheticListeners;
};

export type WithIndex<T> = T & {
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
    placeholderCss?: Interpolation<ThemeProps>;
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
  placeholderCss?: Interpolation<ThemeProps>;
};

export type SortableContainerProps<ItemType extends BaseItem> = Omit<
  DndContextProps,
  'sensors' | 'collisionDetection' | 'modifiers'
> & {
  items: ItemType[];
  axis?: 'x' | 'y';
  onOrderChange?: (newOrder: ItemType[]) => void;
};
