import {
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from 'react';

import { type ButtonProps } from '@synerise/ds-button';

export type EditableItemsListProps<T extends { id: string }> = {
  renderRowElement: (index: number, data: T) => ReactElement | null;
  items?: T[];
  addButtonProps?: Partial<ButtonProps>;
  addButtonLabel: string | ReactNode;
  addButtonIcon?: ReactNode;
  minRowLength?: number;
  maxRowLength?: number;
  deleteTooltip?: string;
  onDelete: (id: string, index: number) => void;
  onAdd: MouseEventHandler<HTMLElement>;
};
