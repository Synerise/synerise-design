import React, { ReactElement, ReactNode } from 'react';
import { ButtonProps } from '@synerise/ds-button';

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
  onAdd: React.MouseEventHandler<HTMLElement>;
};
