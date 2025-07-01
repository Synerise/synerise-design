import { type MouseEvent, type ReactNode } from 'react';

import type SingleAction from './SingleAction';

export interface CrudsProps {
  addTooltip?: ReactNode;
  previewTooltip?: ReactNode;
  moveUpTooltip?: ReactNode;
  moveDownTooltip?: ReactNode;
  moveUpInactive?: boolean;
  moveDownInactive?: boolean;
  editTooltip?: ReactNode;
  duplicateTooltip?: ReactNode;
  removeTooltip?: ReactNode;
  moveTooltip?: ReactNode;
  deleteTooltip?: ReactNode;
  onDelete?: (event?: MouseEvent<HTMLElement>) => void;
  onAdd?: (event?: MouseEvent<HTMLElement>) => void;
  onPreview?: () => void;
  onEdit?: (event?: MouseEvent<HTMLElement>) => void;
  onDuplicate?: (event?: MouseEvent<HTMLElement>) => void;
  onMove?: (event?: MouseEvent<HTMLElement>) => void;
  onMoveUp?: (event?: MouseEvent<HTMLElement>) => void;
  onMoveDown?: (event?: MouseEvent<HTMLElement>) => void;
  onRemove?: (event?: MouseEvent<HTMLElement>) => void;
}

export type CrudsSubComponents = { CustomAction: typeof SingleAction };
