import * as React from 'react';

export type SearchInputProps = {
  alwaysExpanded?: boolean;
  alwaysHighlight?: boolean;
  clearTooltip?: string | React.ReactNode;
  closeOnClickOutside?: boolean;
  elementTextLookupKey?: string;
  elementFilterLookupKey?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterLabel?: { icon?: React.ReactNode; [key: string]: any } | null;
  focusTrigger?: boolean;
  onButtonClick?: () => void;
  onChange: (value: string) => void;
  onClear: () => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onToggle?: (isOpen: boolean) => void;
  placeholder?: string;
  toggleTrigger?: boolean;
  value: string;
};

export type SearchInputState = {
  inputOffset: number;
  isInputOpen: boolean;
  isResultChosen: boolean;
  isInputFocused: boolean;
};
