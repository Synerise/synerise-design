import type { CSSProperties, ReactNode, ReactText } from 'react';
import type { ExactlyOne } from '@synerise/ds-utils';
import type { ItemProps } from './Item/Item.types';

export enum ExpansionBehaviour {
  DEFAULT = 'default',
  ACCORDION = 'accordion',
  CUSTOM = 'custom',
}

export enum ListType {
  DEFAULT = 'default',
  CONTENT = 'content',
  CONTENT_LARGE = 'content-large',
  FILTER = 'filter',
}
export type ManageableListType = `${ListType}`;

export type AdditionalAction = {
  icon: ReactNode;
  color?: string;
  onClick: (item: ItemProps) => void;
  tooltip: string;
};

export type ManageableListProps<T extends object> = {
  className?: string;
  onItemAdd?: (addParams?: { name: string }) => void;
  onItemRemove?: (removeParams: { id: ReactText }) => void;
  onItemEdit?: (editParams: { id: ReactText; name: string }) => void;
  onItemSelect: (selectParams: { id: ReactText }) => void;
  onItemDuplicate?: (duplicateParams: { id: ReactText }) => void;
  onChangeOrder?: (newOrder: ItemProps<T>[]) => void;
  items: ItemProps<T>[];
  loading: boolean;
  type?: ManageableListType;
  addButtonDisabled?: boolean;
  changeOrderDisabled?: boolean;
  greyBackground?: boolean;
  placeholder?: string;
  selectedItemId?: string;
  searchQuery?: string;
  expanderDisabled?: boolean;
  onExpand?: (id: ReactText, isExpanded: boolean) => void;
  texts?: Partial<Texts>;
  expansionBehaviour?: string;
  // @deprecated use item.expanded instead
  expandedIds?: ReactText[];
  changeOrderByButtons?: boolean;
  additionalActions?: AdditionalAction[];
  style?: CSSProperties;
  renderCustomToggleButton?: (props: {
    onClick: () => void;
    total: number;
    limit: number;
    allItemsVisible: boolean;
  }) => ReactNode;
} & ExactlyOne<
  {
    /**
     * @deprecated - use visibleItemsLimit prop instead
     */
    maxToShowItems: number;
  },
  {
    visibleItemsLimit: number;
  }
>;

export type Texts = {
  addItemLabel: ReactNode;
  showMoreLabel: ReactNode;
  showLessLabel: ReactNode;
  more: ReactNode;
  less: ReactNode;
  activateItemTitle: ReactNode;
  activate: ReactNode;
  cancel: ReactNode;
  deleteConfirmationTitle: ReactNode;
  deleteConfirmationDescription: ReactNode;
  deleteConfirmationYes: ReactNode;
  deleteConfirmationNo: ReactNode;
  itemActionRename: ReactNode;
  itemActionRenameTooltip: ReactNode;
  itemActionDuplicate: ReactNode;
  itemActionDuplicateTooltip: ReactNode;
  itemActionDelete: ReactNode;
  itemActionDeleteTooltip: ReactNode;
  moveToTopTooltip: ReactNode;
  moveToBottomTooltip: ReactNode;
};
