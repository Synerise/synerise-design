import * as React from 'react';
import { ItemProps } from '../Item';

export type ItemActionsProps = {
  item: ItemProps;
  removeAction?: (removeParams: { id: string }) => void;
  removeActionTooltip?: string | React.ReactNode;
  editAction?: () => void;
  editActionTooltip?: string | React.ReactNode;
  duplicateAction?: (duplicateParams: { id: string }) => void;
  duplicateActionTooltip?: string | React.ReactNode;
  theme: { [k: string]: string };
};
