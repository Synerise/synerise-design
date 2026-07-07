import { type ReactNode } from 'react';

import { type RawValueType } from './Select.types';

export type OptionProps = {
  value: RawValueType;
  disabled?: boolean;
  /** Native title (hover text). */
  title?: string;
  /** When set, rendered in the selector instead of `children` (antd `optionLabelProp`). */
  label?: ReactNode;
  children?: ReactNode;
};

/**
 * Declarative option marker. Renders nothing on its own — `Select` reads its
 * props (`value`, `children` → label, `disabled`, `title`) to build the internal
 * options list. Kept for back-compat with the antd `Select.Option` API. The antd
 * `Select.OptGroup` is intentionally NOT reimplemented (zero real usage).
 */
export const Option = (_props: OptionProps): null => null;

Option.displayName = 'Select.Option';
