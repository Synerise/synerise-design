import type { ReactText, ReactNode } from 'react';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

import type { ItemProps } from '../Item.types';

export type ContentItemProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    changeOrderDisabled?: boolean;
    dashed?: boolean;
    draggable?: boolean;
    expanded?: boolean;
    greyBackground?: boolean;
    headerPrefix?: ReactNode;
    headerSuffix?: ReactNode;
    hideExpander?: boolean;
    item: ItemProps;
    onDuplicate?: (duplicateParams: { id: ReactText }) => void;
    onExpand?: (id: ReactText, isExpanded: boolean) => void;
    onRemove?: (removeParams: { id: ReactText }) => void;
    onUpdate?: (updateParams: { id: ReactText; name: string }) => void;
    texts?: {
      [k: string]: ReactNode;
    };
    theme: { [k: string]: string };
    contentWithoutPadding?: boolean;
    onMoveTop?: (item: ItemProps) => void;
    onMoveBottom?: (item: ItemProps) => void;
    isFirst?: boolean;
    isLast?: boolean;
  }
>;
