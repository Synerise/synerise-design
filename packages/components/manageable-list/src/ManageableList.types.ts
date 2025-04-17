import type { CSSProperties, ReactNode, ReactText } from 'react';
import type { ExactlyOne } from '@synerise/ds-utils';
import type { BlankItemBaseProps, ItemProps } from './Item/Item.types';

export enum ExpansionBehaviour {
  DEFAULT = 'default',
  ACCORDION = 'accordion',
  CUSTOM = 'custom',
}

export enum ListType {
  DEFAULT = 'default',
  CONTENT = 'content',
  CONTENT_LARGE = 'content-large',
  BLANK = 'blank',
  FILTER = 'filter',
}
export type ManageableListType = `${ListType}`;

export type AdditionalAction = {
  icon: ReactNode;
  color?: string;
  onClick: (item: ItemProps) => void;
  tooltip: string;
};

type CommonProps = {
  className?: string;
  onItemAdd?: (addParams?: { name: string }) => void;
  onItemRemove?: (removeParams: { id: ReactText }) => void;
  onItemEdit?: (editParams: { id: ReactText; name: string }) => void;
  onItemSelect: (selectParams: { id: ReactText }) => void;
  onItemDuplicate?: (duplicateParams: { id: ReactText }) => void;
  loading: boolean;
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

export type BlankManageableListProps<T extends object> = {
  type: 'blank';
  renderItem: (item: BlankItemBaseProps<T>) => ReactNode;
  items: BlankItemBaseProps<T>[];
  rowGap?: number;
  onChangeOrder?: (newOrder: BlankItemBaseProps<T>[]) => void;
} & CommonProps;

export type LegacyManageableListProps<T extends object> = {
  type?: Exclude<ManageableListType, 'blank'>;
  items: ItemProps<T>[];
  onChangeOrder?: (newOrder: ItemProps<T>[]) => void;
} & CommonProps;

export type ManageableListProps<T extends object> = BlankManageableListProps<T> | LegacyManageableListProps<T>;

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
