import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from '@synerise/ds-sortable';

import type { Column, ColumnManagerTexts } from '../ColumnManager.types';

export type ColumnManagerItemProps<ColumnType extends Column> = {
  draggable?: boolean;
  isDragged?: boolean;
  switchAction: (id: string, visible: boolean) => void;
  searchQuery?: string;
  item: ColumnType;
  texts: ColumnManagerTexts;
  index?: number;
  dragHandleProps?: {
    attributes: DraggableAttributes;
    listeners: DraggableSyntheticListeners;
  };
  id: string | number;
};
