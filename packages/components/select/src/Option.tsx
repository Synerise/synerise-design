import { type CSSProperties, type ReactNode } from 'react';

import { type RawValueType } from './Select.types';

export type OptionProps = {
  /** antd parity: optional — falls back to the element's React `key` when omitted. */
  value?: RawValueType;
  disabled?: boolean;
  /** Native title (hover text). antd parity: accepts any node (coerced to a string title at render). */
  title?: ReactNode;
  /** When set, rendered in the selector instead of `children` (antd `optionLabelProp`). */
  label?: ReactNode;
  children?: ReactNode;
  /** antd parity: forwarded to the rendered option row. */
  style?: CSSProperties;
  className?: string;
  /** antd parity: native `data-*` / `aria-*` attributes, forwarded to the rendered option row. */
  [dataAttr: `data-${string}`]: unknown;
  [ariaAttr: `aria-${string}`]: unknown;
};

/**
 * Declarative option marker. Renders nothing on its own — `Select` reads its
 * props (`value`, `children` → label, `disabled`, `title`) to build the internal
 * options list. Kept for back-compat with the antd `Select.Option` API. The antd
 * `Select.OptGroup` is intentionally NOT reimplemented (zero real usage).
 */
export const Option = (_props: OptionProps): null => null;

Option.displayName = 'Select.Option';
