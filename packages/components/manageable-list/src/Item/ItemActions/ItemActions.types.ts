import React from 'react';
import { AdditionalAction } from '../../ManageableList.types';
import { ItemProps } from '../Item.types';

export type ItemActionsProps = {
  item: ItemProps;
  removeAction?: (removeParams: { id: React.ReactText }) => void;
  removeActionTooltip?: string | React.ReactNode;
  editAction?: () => void;
  editActionTooltip?: string | React.ReactNode;
  duplicateAction?: (duplicateParams: { id: React.ReactText }) => void;
  duplicateActionTooltip?: string | React.ReactNode;
  additionalActions?: AdditionalAction[];
};
