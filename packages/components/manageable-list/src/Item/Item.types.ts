import * as React from 'react';

export type Props = {
  item: ItemProps;
  onRemove?: (removeParams: { id: string }) => void;
  onSelect: (selectParams: { id: string }) => void;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  onDuplicate?: (duplicateParams: { id: string }) => void;
  draggable?: boolean;
  changeOrderDisabled?: boolean;
  greyBackground?: boolean;
  listType: string;
  selected: boolean;
  searchQuery?: string;
  texts: {
    [k: string]: string | React.ReactNode;
  };
  onExpand?: (id: string, isExpanded: boolean) => void;
  hideExpander?: boolean;
  expanded?: boolean;
};

export type ItemProps = {
  id: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  canDuplicate?: boolean;
  name: string;
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
};
