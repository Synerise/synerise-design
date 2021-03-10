import * as React from 'react';
import { ItemProps } from '../Item.types';

export type ContentItemProps = {
  changeOrderDisabled?: boolean;
  dashed?: boolean;
  draggable?: boolean;
  expanded?: boolean;
  greyBackground?: boolean;
  headerPrefix?: React.ReactNode;
  headerSuffix?: React.ReactNode;
  hideExpander?: boolean;
  item: ItemProps;
  onDuplicate?: (duplicateParams: { id: React.ReactText }) => void;
  onExpand?: (id: React.ReactText, isExpanded: boolean) => void;
  onRemove?: (removeParams: { id: React.ReactText }) => void;
  onUpdate?: (updateParams: { id: React.ReactText; name: string }) => void;
  texts?: {
    [k: string]: string | React.ReactNode;
  };
  theme: { [k: string]: string };
  contentWithoutPadding?: boolean;
  onMoveTop?: (item: ItemProps) => void;
  onMoveBottom?: (item: ItemProps) => void;
  isFirst?: boolean;
  isLast?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
