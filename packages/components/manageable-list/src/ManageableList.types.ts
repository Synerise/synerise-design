import * as React from 'react';
import { ItemProps } from './Item/Item';

export interface ManageableListProps {
  className?: string;
  maxToShowItems: number;
  onItemAdd?: (addParams?: { name: string }) => void;
  onItemRemove?: (removeParams: { id: string }) => void;
  onItemEdit?: (editParams: { id: string; name: string }) => void;
  onItemSelect: (selectParams: { id: string }) => void;
  onItemDuplicate?: (duplicateParams: { id: string }) => void;
  onChangeOrder?: (newOrder: ItemProps[]) => void;
  items: ItemProps[];
  loading: boolean;
  type?: string;
  addButtonDisabled?: boolean;
  changeOrderDisabled?: boolean;
  greyBackground?: boolean;
  placeholder?: string;
  selectedItemId?: string;
  searchQuery?: string;
  expanderDisabled?: boolean;
  onExpand?: (id: string, isExpanded: boolean) => void;
  texts: {
    addItemLabel?: string | React.ReactNode;
    showMoreLabel?: string | React.ReactNode;
    showLessLabel?: string | React.ReactNode;
    more?: string | React.ReactNode;
    less?: string | React.ReactNode;
    activateItemTitle?: string | React.ReactNode;
    activate?: string | React.ReactNode;
    cancel?: string | React.ReactNode;
    deleteConfirmationTitle?: string | React.ReactNode;
    deleteConfirmationDescription?: string | React.ReactNode;
    deleteConfirmationYes?: string | React.ReactNode;
    deleteConfirmationNo?: string | React.ReactNode;
    itemActionRename?: string | React.ReactNode;
    itemActionRenameTooltip?: string | React.ReactNode;
    itemActionDuplicate?: string | React.ReactNode;
    itemActionDuplicateTooltip?: string | React.ReactNode;
    itemActionDelete?: string | React.ReactNode;
    itemActionDeleteTooltip?: string | React.ReactNode;
  };
}
