import * as React from 'react';

export interface CrudsProps {
  addTooltip?: React.ReactNode | string;
  editTooltip?: React.ReactNode | string;
  duplicateTooltip?: React.ReactNode | string;
  removeTooltip?: React.ReactNode | string;
  moveTooltip?: React.ReactNode | string;
  deleteTooltip?: React.ReactNode | string;
  onDelete?: (event?: React.MouseEvent<HTMLElement>) => void;
  onAdd?: (event?: React.MouseEvent<HTMLElement>) => void;
  onEdit?: (event?: React.MouseEvent<HTMLElement>) => void;
  onDuplicate?: (event?: React.MouseEvent<HTMLElement>) => void;
  onMove?: (event?: React.MouseEvent<HTMLElement>) => void;
  onRemove?: (event?: React.MouseEvent<HTMLElement>) => void;

}