import { type ListItemProps } from '@synerise/ds-list-item';

import {
  type DropdownMenuProps,
  type DropdownMenuTexts,
} from '../DropdownMenu/DropdownMenu.types';

export type DropdownMenuListItemProps = ListItemProps;

export type DropdownMenuListProps<ItemType extends DropdownMenuListItemProps> =
  Pick<
    DropdownMenuProps<ItemType>,
    'dataSource' | 'hideOnItemClick' | 'virtualised' | 'maxVisibleItems'
  > & {
    closeOverlay: () => void;
    texts: DropdownMenuTexts;
  };
