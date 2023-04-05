import * as React from 'react';
import { AdditionalAction } from 'ManageableList.types';

export type Props = {
  item: ItemProps;
  isFirst?: boolean;
  isLast?: boolean;
  onMoveTop?: (item: ItemProps) => void;
  onMoveBottom?: (item: ItemProps) => void;
  onRemove?: (removeParams: { id: React.ReactText }) => void;
  onSelect: (selectParams: { id: React.ReactText }) => void;
  onUpdate?: (updateParams: { id: React.ReactText; name: string }) => void;
  onDuplicate?: (duplicateParams: { id: React.ReactText }) => void;
  draggable?: boolean;
  changeOrderDisabled?: boolean;
  greyBackground?: boolean;
  listType: string;
  selected: boolean;
  searchQuery?: string;
  texts: {
    [k: string]: string | React.ReactNode;
  };
  onExpand?: (id: React.ReactText, isExpanded: boolean) => void;
  hideExpander?: boolean;
  expanded?: boolean;
  additionalActions?: AdditionalAction[];
};

export type ItemProps<T extends object = {}> = T & {
  id: React.ReactText;
  canUpdate?: boolean;
  canDelete?: boolean;
  canDuplicate?: boolean;
  name: string;
  nameWrapperClassNames?: string[];
  description?: string;
  tag?: React.ReactElement;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  changeOrderDisabled?: boolean;
  user?: {
    avatar_url?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
  };
  created?: string;
  dropdown?: React.ReactElement;
  disableExpanding?: boolean;
  expanded?: boolean;
  headerSuffix?: React.ReactNode;
  hideHeaderSuffixOnHover?: boolean;
  additionalSuffix?: React.ReactNode;
};
