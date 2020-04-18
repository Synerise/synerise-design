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
  onClear: (value: string) => any;
  onKeyDown: (e: any) => any;
  onClick?: (e: any) => any;
  onButtonClick?: (e: any) => any;
  onExpand?: (e: any) => any;
  closeOnClickOutside?: boolean;
  filterLabel?: FilterElement;
  focusTrigger?: boolean;
  toggleTrigger?: boolean;
  onToggle?: (isOpen: boolean) => any;
};
