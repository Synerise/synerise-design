import * as React from 'react';
import { FilterElement } from '../../Search.types';

export type SearchInputProps = {
  clearTooltip: string | React.ReactNode;
  onChange: (value: string) => void;
  onClear: () => void;
  value: string;
  alwaysExpanded?: boolean;
  alwaysHighlight?: boolean;
  closeOnClickOutside?: boolean;
  filterLabel?: FilterElement | null;
  focusTrigger?: boolean;
  onButtonClick?: () => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onToggle?: (isOpen: boolean) => void;
  placeholder?: string;
  toggleTrigger?: boolean;
};

export type SearchInputState = {
  inputOffset: number;
  isInputOpen: boolean;
  isResultChosen: boolean;
}
