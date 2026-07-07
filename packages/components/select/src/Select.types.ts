import {
  type CSSProperties,
  type FocusEvent,
  type Key,
  type ReactNode,
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
  /** Rendered content in the dropdown row (and the selector unless `optionLabelProp` picks another field). */
  label?: ReactNode;
  disabled?: boolean;
  /** Native `title` on the option (hover tooltip / accessible text), mirrors antd. */
  title?: string;
  /** Value used for client-side filtering when `optionFilterProp` is set. */
  filterValue?: string;
};

/** Signature of a client-side option filter (antd-compatible). */
export type FilterOptionFn = (input: string, option: SelectOption) => boolean;

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

  /** `undefined` = single-select; `'multiple'` / `'tags'` = multi-value. */
  mode?: SelectMode;

  /** Options as data. When omitted, `<Select.Option>` children are read instead. */
  options?: SelectOption[];

  showSearch?: boolean;
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
  defaultActiveFirstOption?: boolean;
  showArrow?: boolean;

  /** Tags/multiple display limits (antd parity). */
  maxTagCount?: number;
  maxTagTextLength?: number;
  /** Characters that split typed text into tags in `mode="tags"`. */
  tokenSeparators?: string[];

  open?: boolean;
  defaultOpen?: boolean;

  /** Dropdown positioning / sizing. */
  getPopupContainer?: (trigger: HTMLElement) => HTMLElement;
  placement?: DropdownPlacement;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  /** Match the dropdown width to the selector (default true). */
  dropdownMatchSelectWidth?: boolean;
  /** Wrap the rendered option menu (custom footer / scroll container). */
  dropdownRender?: (menu: ReactNode) => ReactNode;
  /** Max dropdown list height (px). */
  listHeight?: number | string;
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
  size?: 'small' | 'middle' | 'large' | 'default';
  error?: boolean;

  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & FormFieldCommonProps;

/** @deprecated internal alias kept for back-compat with the antd-era `Props` name. */
export type Props<VT extends SelectValue = SelectValue> = SelectProps<VT>;
