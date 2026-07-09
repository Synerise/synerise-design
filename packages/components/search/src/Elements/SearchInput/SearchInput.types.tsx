import type {
  InputHTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
} from 'react';

import type { TooltipProps } from '@synerise/ds-tooltip';

/**
 * Native input attributes plus the antd-compat `onPressEnter` convenience
 * (fired on Enter). The native `<input>` has no `onPressEnter`, so `SearchInput`
 * translates it to an Enter check on `onKeyDown`.
 */
export type SearchInputAttributes = InputHTMLAttributes<HTMLInputElement> & {
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
};

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
  disabled?: boolean;
  inputProps?: SearchInputAttributes;
  searchTooltipProps?: Partial<TooltipProps>;
};
