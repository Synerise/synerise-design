import type { ReactNode, KeyboardEvent } from 'react';
import type { InputProps } from 'antd/lib/input';

export type SearchInputProps = {
  alwaysExpanded?: boolean;
  alwaysHighlight?: boolean;
  clearTooltip?: ReactNode;
  closeOnClickOutside?: boolean;
  textLookupKey?: string;
  filterLookupKey?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterLabel?: { icon?: ReactNode; [key: string]: any } | null;
  focusTrigger?: boolean;
  onButtonClick?: () => void;
  onChange: (value: string) => void;
  onClear: () => void;
  onClick?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onToggle?: (isOpen: boolean) => void;
  placeholder?: string;
  toggleTrigger?: boolean;
  value: string;
  moveCursorToEnd?: boolean;
  disableInput?: boolean;
  inputProps?: Partial<InputProps>;
};
