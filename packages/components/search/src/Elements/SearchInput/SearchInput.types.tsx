import * as React from 'react';

export type FilterElement = {
  text: string;
  filter?: string;
  icon?: React.ReactNode;
};

export type SearchInputProps = {
  placeholder: string;
  clearTooltip: string | React.ReactNode;
  onValueChange: (value: string) => any;
  value: string;
  onClear: (value: string) => any;
  onKeyDown: (e: any) => any;
  onClick?: () => void;
  onButtonClick?: () => void;
  onExpand?: () => void;
  closeOnClickOutside?: boolean;
  filterLabel?: FilterElement | null;
  focusTrigger?: boolean;
  toggleTrigger?: boolean;
  onToggle?: (isOpen: boolean) => any;
};
