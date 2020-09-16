import * as React from 'react';

export interface CrudsProps {
  addTooltip?: React.ReactNode | string;
  editTooltip?: React.ReactNode | string;
  duplicateTooltip?: React.ReactNode | string;
  removeTooltip?: React.ReactNode | string;
  moveTooltip?: React.ReactNode | string;
  deleteTooltip?: React.ReactNode | string;
  onDelete?: () => void;
  onAdd?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onMove?: () => void;
  onRemove?: () => void;
}