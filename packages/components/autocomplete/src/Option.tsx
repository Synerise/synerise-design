import type { ReactNode } from 'react';

export type OptionProps = {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
};

/**
 * Declarative option marker. It renders nothing on its own — `Autocomplete`
 * reads its props (`value`, `children` → label) to build the internal options
 * list. Kept for backwards compatibility with the antd `AutoComplete.Option` API.
 */
export const Option = (_props: OptionProps): null => null;

Option.displayName = 'Autocomplete.Option';
// Recognised by `getOptionsFromChildren` without relying on reference equality, which
// breaks across module instances (duplicate copies in a consumer bundle, mocks, memo
// wrappers). rc-select carried the same static flag for the same reason.
Option.isAutocompleteOption = true;
