import type { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import type { ColumnManagerTexts } from '../ColumnManager.types';

export type ColumnIconType = string | 'text' | 'number' | 'date' | 'boolean' | 'list';

export type Column = {
  id: string;
  name: string;
  visible: boolean;
  readOnly?: boolean;
  type?: ColumnIconType;
};

export type ColumnManagerItemProps<ColumnType extends Column> = {
  draggable?: boolean;
  isDragged?: boolean;
  switchAction: (id: string, visible: boolean) => void;
  searchQuery?: string;
  item: ColumnType;
  texts: ColumnManagerTexts;
  index?: number;
  dragHandleProps?: { attributes: DraggableAttributes; listeners: DraggableSyntheticListeners };
  id: string | number;
};
