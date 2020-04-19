import * as React from 'react';

export type FilterElement = {
  text: string;
  filter?: string;
  icon?: React.ReactNode;
};

export type SearchInputProps = {
  placeholder: string;
  clearTooltip: string | React.ReactNode;
  onValueChange: (value: string) => void;
  value: string;
  onClear: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onButtonClick?: () => void;
  onExpand?: () => void;
  closeOnClickOutside?: boolean;
  filterLabel?: FilterElement | null;
  focusTrigger?: boolean;
  toggleTrigger?: boolean;
  onToggle?: (isOpen: boolean) => void;
};
