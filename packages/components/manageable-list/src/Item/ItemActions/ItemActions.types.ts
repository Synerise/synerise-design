import type React from 'react';

import { type AdditionalAction } from '../../ManageableList.types';
import { type ItemProps } from '../Item.types';

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
