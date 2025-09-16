import type {
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  ReactText,
} from 'react';

import type { ExactlyOne } from '@synerise/ds-utils';

export enum ExpansionBehaviour {
  DEFAULT = 'default',
  ACCORDION = 'accordion',
  CUSTOM = 'custom',
}

export enum ListType {
  DEFAULT = 'default',
  BLANK = 'blank',
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
  renderItem?: (item: ItemProps) => ReactNode;
} & ExactlyOne<
  {
    /**
     * @deprecated - use visibleItemsLimit prop instead
     */
    maxToShowItems?: number;
  },
  {
    visibleItemsLimit?: number;
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

export type ManageableListItemProps = {
  item: ItemProps;
  isFirst?: boolean;
  isLast?: boolean;
  renderItem: (item: ItemProps) => ReactNode;
  onMoveTop?: (item: ItemProps) => void;
  onMoveBottom?: (item: ItemProps) => void;
  onRemove?: (removeParams: { id: ReactText }) => void;
  onSelect: (selectParams: { id: ReactText }) => void;
  onUpdate?: (updateParams: { id: ReactText; name: string }) => void;
  onDuplicate?: (duplicateParams: { id: ReactText }) => void;
  draggable?: boolean;
  changeOrderDisabled?: boolean;
  greyBackground?: boolean;
  listType: string;
  selected: boolean;
  searchQuery?: string;
  texts: Texts;
  onExpand?: (id: ReactText, isExpanded: boolean) => void;
  hideExpander?: boolean;
  expanded?: boolean;
  additionalActions?: AdditionalAction[];
  isDragPlaceholder?: boolean;
  isDragOverlay?: boolean;
  dragHandleProps?: HTMLAttributes<HTMLDivElement>;
};

export type ItemProps<T extends object = object> = T & {
  id: ReactText;
  canUpdate?: boolean;
  canDelete?: boolean;
  canDuplicate?: boolean;
  name: string;
  nameWrapperClassNames?: string[];
  description?: string;
  /**
   * @description render a tag as item prefix
   */
  tag?: ReactElement;
  /**
   * @description render an icon as item prefix
   */
  icon?: ReactNode;
  /**
   * @description rendered only in content-large item type
   */
  tags?: ReactNode;
  /**
   * @description rendered only in content-large item type
   */
  headerPrefix?: ReactNode;
  content?: ReactNode;
  uniqueKey?: ReactNode;
  changeOrderDisabled?: boolean;
  user?: {
    avatar_url?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
  };
  created?: string;
  dropdown?: ReactElement;
  /**
   * @description disables expanding item on click - will always show entire content without expanding
   */
  disableExpanding?: boolean;
  /**
   * @description disables header click to expand/collapse item
   */
  disableHeaderClick?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  headerSuffix?: ReactNode;
  hideHeaderSuffixOnHover?: boolean;
  additionalSuffix?: ReactNode;
};
