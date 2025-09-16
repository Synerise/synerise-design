import type { HTMLAttributes, ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

import type { ItemProps, Texts } from '../../ManageableList.types';

export type BlankItemBaseProps<T extends object> = Pick<
  ItemProps<T>,
  'id' | 'name'
>;

export type BaseBlankItemProps<T extends object> = {
  texts?: Partial<Texts>;
  draggable?: boolean;
  renderItem: (item: BlankItemBaseProps<T>) => ReactNode;
  item: BlankItemBaseProps<T>;
  index?: number;
  rowGap?: number;
  onDuplicate?: (duplicateParams: { id: string | number }) => void;
  onRemove?: (removeParams: { id: string | number }) => void;
  isDragPlaceholder?: boolean;
  isDragOverlay?: boolean;
  dragHandleProps?: HTMLAttributes<HTMLDivElement>;
};

export type BlankItemProps<T extends object> = WithHTMLAttributes<
  HTMLDivElement,
  BaseBlankItemProps<T>
>;
