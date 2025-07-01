import type { ReactElement, ReactNode, ReactText } from 'react';

import type { AdditionalAction, Texts } from '../ManageableList.types';

export type Props = {
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
  disableExpanding?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  headerSuffix?: ReactNode;
  hideHeaderSuffixOnHover?: boolean;
  additionalSuffix?: ReactNode;
};
