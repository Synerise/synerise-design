import type { ReactNode } from 'react';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

import type { BlankItemBaseProps } from '../Item.types';
import type { Texts } from '../../ManageableList.types';

export type BaseBlankItemProps<T extends object> = {
  texts?: Partial<Texts>;
  draggable?: boolean;
  renderItem: (item: BlankItemBaseProps<T>) => ReactNode;
  item: BlankItemBaseProps<T>;
  index?: number;
  rowGap?: number;
  onDuplicate?: (duplicateParams: { id: string | number }) => void;
  onRemove?: (removeParams: { id: string | number }) => void;
};

export type BlankItemProps<T extends object> = WithHTMLAttributes<HTMLDivElement, BaseBlankItemProps<T>>;
