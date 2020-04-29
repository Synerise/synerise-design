import * as React from 'react';
import { FilterElement } from '../../Search.types';

export type SearchInputProps = {
  placeholder?: string;
  clearTooltip: string | React.ReactNode;
  onChange: (value: string) => void;
  value: string;
  onClear: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onButtonClick?: () => void;
  closeOnClickOutside?: boolean;
  filterLabel?: FilterElement | null;
  focusTrigger?: boolean;
  toggleTrigger?: boolean;
  onToggle?: (isOpen: boolean) => void;
  alwaysHighlight?: boolean;
  alwaysExpanded?: boolean;
};
