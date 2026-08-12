import {
  type AriaAttributes,
  type CSSProperties,
  type FocusEvent,
  type Key,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type UIEvent,
} from 'react';
import { type CSSObject } from 'styled-components';

import { type DropdownPlacement } from '@synerise/ds-dropdown';
import { type FormFieldCommonProps } from '@synerise/ds-form-field';

/**
 * The selected value. A plain value for single-select, an array for
 * `mode="multiple"` / `mode="tags"`. Replaces antd's `SelectValue`.
 */
export type RawValueType = string | number;
export type SelectValue = RawValueType | RawValueType[] | undefined;

export type SelectMode = 'multiple' | 'tags';

/** Internal, normalised option shape (from `options` prop or `<Select.Option>` children). */
export type SelectOption = {
  value: RawValueType;
  /** antd-parity alias of `value`; some consumers read `option.key` in callbacks. */
  key?: RawValueType;
  /** Selector display, and the dropdown row too unless `children` carries its own content. */
  label?: ReactNode;
  disabled?: boolean;
  /** Native `title` on the option (hover tooltip / accessible text), mirrors antd. */
  title?: ReactNode;
  /** Raw children of `<Select.Option>` — the dropdown row content (antd parity). */
  children?: ReactNode;
  /** antd parity: forwarded to the rendered option row. */
  style?: CSSProperties;
  /** Value used for client-side filtering when `optionFilterProp` is set. */
  filterValue?: string;
  /** antd parity: per-option `data-*` / `aria-*` attributes, forwarded to the rendered option row. */
  [dataAttr: `data-${string}`]: unknown;
  [ariaAttr: `aria-${string}`]: unknown;
};

/** Signature of a client-side option filter (antd-compatible). */
export type FilterOptionFn = (input: string, option: SelectOption) => boolean;

/** antd-parity: type for a select `onChange` / `onSelect` handler. */
export type SelectHandler<VT extends RawValueType = RawValueType> = (
  value: VT,
  option?: SelectOption | SelectOption[],
) => void;

export type SelectProps<VT extends SelectValue = SelectValue> = {
  value?: VT;
  defaultValue?: VT;
  onChange?: (value: VT, option?: SelectOption | SelectOption[]) => void;
  onSelect?: (value: RawValueType, option?: SelectOption) => void;
  onDeselect?: (value: RawValueType, option?: SelectOption) => void;
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  /** Remote-search callback (pair with `filterOption={false}`). */
  onSearch?: (value: string) => void;
  /** antd parity: fired as the dropdown option list scrolls (e.g. to page in more options). */
  onPopupScroll?: (event: UIEvent<HTMLDivElement>) => void;
  /** antd parity: fired when the clear affordance is used. */
  onClear?: () => void;
  /** antd parity: click handler on the selector box. */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  /** antd parity: keydown on the inner search input. */
  onInputKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  /** antd parity: keydown on the selector. */
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;

  /** `undefined` = single-select; `'multiple'` / `'tags'` = multi-value. */
  mode?: SelectMode;

  /** Options as data. When omitted, `<Select.Option>` children are read instead. */
  options?: SelectOption[];

  showSearch?: boolean;
  /** Controlled search-input value (antd parity). Pairs with `onSearch`. */
  searchValue?: string;
  /** antd parity: max length of the search input. */
  maxLength?: number;
  /** `true`/`false` toggles built-in filtering; a function is a custom predicate. */
  filterOption?: boolean | FilterOptionFn;
  /** Which option field the built-in filter matches against (default: label). */
  optionFilterProp?: string;
  /** Which option field renders in the selector (default: label). */
  optionLabelProp?: string;

  placeholder?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  autoFocus?: boolean;
  /**
   * antd parity: accepted for back-compat but NOT implemented. The dropdown
   * always highlights the selected (or first enabled) option on open, so this
   * flag has no effect.
   */
  defaultActiveFirstOption?: boolean;
  showArrow?: boolean;
  /** antd parity: custom icon replacing the dropdown arrow. */
  suffixIcon?: ReactNode;
  /** antd parity: tab index forwarded to the selector / search input. */
  tabIndex?: number;

  /** Max chips rendered in `multiple` / `tags` mode before the rest collapse into an overflow chip. */
  maxTagCount?: number;
  /** Max characters shown per chip label; longer labels are truncated with an ellipsis. */
  maxTagTextLength?: number;
  /**
   * Content of the collapsed-overflow chip (antd parity). A node renders as-is;
   * a function receives the omitted options and returns the node. Defaults to `+ N`.
   */
  maxTagPlaceholder?:
    | ReactNode
    | ((
        omittedValues: Array<{ value: RawValueType; label: ReactNode }>,
      ) => ReactNode);
  /** Characters that split typed text into tags in `mode="tags"`. */
  tokenSeparators?: string[];

  open?: boolean;
  defaultOpen?: boolean;

  /** Dropdown positioning / sizing. antd parity: consumers may return `parentNode` (`ParentNode | null`). */
  getPopupContainer?: (trigger: HTMLElement) => HTMLElement | ParentNode | null;
  placement?: DropdownPlacement;
  dropdownClassName?: string;
  /** antd v4 alias of `dropdownClassName`. */
  popupClassName?: string;
  /** antd parity: dropdown alignment config (accepted for compatibility). */
  dropdownAlign?: Record<string, unknown>;
  dropdownStyle?: CSSProperties;
  /** Match the dropdown width to the selector (default true). A number fixes the dropdown width in px (antd parity). */
  dropdownMatchSelectWidth?: boolean | number;
  /** Wrap the rendered option menu (custom footer / scroll container). antd parity: receives a `ReactElement`. */
  dropdownRender?: (menu: ReactElement) => ReactNode;
  /** Max dropdown list height (px). */
  listHeight?: number | string;
  /** antd parity: fixed height per option row (px). Accepted for compatibility (non-virtualised list). */
  listItemHeight?: number;
  notFoundContent?: ReactNode;
  clearIcon?: ReactNode;

  /** Item key extractor for `<Select.Option>` children / options. */
  rowKey?: (option: SelectOption) => Key;

  // ── DS-specific ──────────────────────────────────────────────────────────
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  grey?: boolean;
  /** Render just the selector (no FormField chrome). */
  raw?: boolean;
  readOnly?: boolean;
  asFormElement?: boolean;
  selectorStyle?: CSSObject;
  clearTooltip?: string;
  size?: 'middle' | 'large' | 'default';
  error?: boolean;

  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** antd parity: forward native `data-*` attributes (e.g. `data-testid`) to the select root. */
  [dataAttr: `data-${string}`]: unknown;
} & FormFieldCommonProps &
  AriaAttributes;

/** @deprecated internal alias kept for back-compat with the antd-era `Props` name. */
export type Props<VT extends SelectValue = SelectValue> = SelectProps<VT>;
