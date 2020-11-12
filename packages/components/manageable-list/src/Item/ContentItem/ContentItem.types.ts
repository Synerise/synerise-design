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
  onDuplicate?: (duplicateParams: { id: string }) => void;
  onExpand?: (id: string, isExpanded: boolean) => void;
  onRemove?: (removeParams: { id: string }) => void;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  texts?: {
    [k: string]: string | React.ReactNode;
  };
  theme: { [k: string]: string };
  contentWithoutPadding?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
