import type { CSSProperties, MutableRefObject, ReactNode } from 'react';

import type { DropdownPlacement } from '@synerise/ds-dropdown';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';
import type { AutoResizeProp } from '@synerise/ds-input';

export type AutocompleteOption = {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
};

/**
 * Imperative handle exposed through `handleInputRef`. Native replacement for the
 * antd `RefSelectProps` — only the focus affordance the icon slots rely on is
 * guaranteed, alongside the underlying `<input>` element.
 */
export type AutocompleteInputHandle = {
  focus: () => void;
  blur: () => void;
  input: HTMLInputElement | null;
};

export type AutocompleteProps = FormFieldCommonProps & {
  className?: string;
  /** Inline style applied to the outer wrapper (e.g. `{ width: 350 }`). */
  style?: CSSProperties;
  icon1?: ReactNode;
  icon1Tooltip?: ReactNode;
  icon2?: ReactNode;
  icon2Tooltip?: ReactNode;
  error?: boolean;
  readOnly?: boolean;
  autoResize?: AutoResizeProp;
  /**
   * Container the floating dropdown is mounted into. Defaults to the trigger's
   * `parentNode` (mirrors the legacy antd `getParentNode`).
   */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  handleInputRef?: (
    ref: MutableRefObject<AutocompleteInputHandle | null>,
  ) => void;

  /** Options shown in the dropdown. The component does NOT filter them. */
  options?: AutocompleteOption[];
  /** Declarative options via `Autocomplete.Option` children. */
  children?: ReactNode;

  value?: string;
  defaultValue?: string;
  placeholder?: ReactNode;
  disabled?: boolean;
  allowClear?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  id?: string;
  /**
   * antd parity. When `true` (default), pressing Enter while the dropdown is open —
   * before arrow-navigating into the list — selects the first enabled option. Set
   * `false` to require explicit arrow-key navigation before Enter selects.
   */
  defaultActiveFirstOption?: boolean;
  /** Rendered inside the dropdown when there are no options. */
  notFoundContent?: ReactNode;
  placement?: DropdownPlacement;

  /** Controlled dropdown visibility. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onDropdownVisibleChange?: (open: boolean) => void;

  onChange?: (value: string) => void;
  /** Fired on every input keystroke. */
  onSearch?: (value: string) => void;
  /**
   * Optional client-side filtering (antd-parity). Off by default (consumers
   * filter server-side via `onSearch`). `true` = default match on the option's
   * value / string label; a function `(inputValue, option) => boolean` = custom.
   */
  filterOption?:
    | boolean
    | ((inputValue: string, option: AutocompleteOption) => boolean);
  /** Fired when an option is chosen. */
  onSelect?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};
