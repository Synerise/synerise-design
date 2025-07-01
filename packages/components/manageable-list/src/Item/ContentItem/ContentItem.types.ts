import { type ReactNode, type ReactText } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

import { type Texts } from '../../ManageableList.types';
import { type ItemProps } from '../Item.types';

type BaseContentItemProps = Omit<
  ContentItemHeaderProps,
  'texts' | 'isExapnded' | 'setIsExpanded'
> & {
  dashed?: boolean;
  expanded?: boolean;
  greyBackground?: boolean;
  contentWithoutPadding?: boolean;
  texts?: ContentItemHeaderProps['texts'] | undefined;
};

export type ContentItemHeaderProps = {
  size?: 'default' | 'large';
  changeOrderDisabled?: boolean;
  draggable?: boolean;
  isExpanded?: boolean;
  setIsExpanded: (expandedState: boolean) => void;
  headerPrefix?: ReactNode;
  headerSuffix?: ReactNode;
  hideExpander?: boolean;
  item: ItemProps;
  onDuplicate?: (duplicateParams: { id: ReactText }) => void;
  onExpand?: (id: ReactText, isExpanded: boolean) => void;
  onRemove?: (removeParams: { id: ReactText }) => void;
  onUpdate?: (updateParams: { id: ReactText; name: string }) => void;
  texts?: Partial<Texts>;
  onMoveTop?: (item: ItemProps) => void;
  onMoveBottom?: (item: ItemProps) => void;
  isFirst?: boolean;
  isLast?: boolean;
};

export type ContentItemProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseContentItemProps
>;
