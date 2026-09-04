import { type ReactNode, useMemo, useRef } from 'react';

import {
  type FilterOptionFn,
  type RawValueType,
  type SelectOption,
} from '../Select.types';
import { areOptionChildrenEqual } from '../utils/areOptionChildrenEqual';
import { getOptionsFromChildren } from '../utils/getOptionsFromChildren';
import { defaultFilter } from '../utils/helpers';

/**
 * `getOptionsFromChildren`, cached against a *structural* comparison of the
 * children. A `useMemo` on `[children]` would be useless: JSX hands us a fresh
 * array of fresh elements on every parent render, so the options (and every memo
 * downstream of them) would be rebuilt even when nothing about them changed.
 */
const useOptionsFromChildren = (children: ReactNode): SelectOption[] => {
  const cacheRef = useRef<{
    children: ReactNode;
    options: SelectOption[];
  } | null>(null);

  const cached = cacheRef.current;
  if (cached && areOptionChildrenEqual(cached.children, children)) {
    return cached.options;
  }
  const options = getOptionsFromChildren(children);
  cacheRef.current = { children, options };
  return options;
};

type UseSelectOptionsParams = {
  /** Options as data; when empty, `<Select.Option>` children are read instead. */
  options?: SelectOption[];
  children: ReactNode;
  /** `false` = remote search (never filter locally); a function is a custom predicate. */
  filterOption?: boolean | FilterOptionFn;
  optionFilterProp?: string;
  /** Current search text (controlled `searchValue` or the internal query). */
  effectiveQuery: string;
  isTags: boolean;
  /** Already-selected values (so tags mode doesn't offer an existing value as new). */
  selectedValues: RawValueType[];
};

type UseSelectOptionsResult = {
  /** Options from the `options` prop, or resolved from `<Select.Option>` children. */
  resolvedOptions: SelectOption[];
  /** `resolvedOptions` after client-side filtering + the tags create-row. */
  displayedOptions: SelectOption[];
};

/**
 * Resolve a Select's option list: `options` prop → `<Select.Option>` children,
 * then apply client-side filtering (`filterOption` / `optionFilterProp`) and, in
 * `mode="tags"`, prepend the typed text as a create-able row.
 */
export const useSelectOptions = ({
  options,
  children,
  filterOption,
  optionFilterProp,
  effectiveQuery,
  isTags,
  selectedValues,
}: UseSelectOptionsParams): UseSelectOptionsResult => {
  const hasOptionsProp = Boolean(options && options.length > 0);
  // Skip the children walk entirely when options-as-data are supplied.
  const childrenOptions = useOptionsFromChildren(
    hasOptionsProp ? null : children,
  );
  const resolvedOptions = hasOptionsProp
    ? (options as SelectOption[])
    : childrenOptions;

  // Client-side filtering. `filterOption={false}` = remote (consumer feeds
  // `options` from `onSearch`), so never filter locally.
  const displayedOptions = useMemo<SelectOption[]>(() => {
    let list = resolvedOptions;
    if (filterOption !== false && effectiveQuery) {
      const match =
        typeof filterOption === 'function'
          ? filterOption
          : defaultFilter(optionFilterProp);
      list = resolvedOptions.filter((option) => match(effectiveQuery, option));
    }
    // tags: offer the typed text as a create-able option when it isn't one.
    if (
      isTags &&
      effectiveQuery &&
      !resolvedOptions.some(
        (option) => String(option.value) === effectiveQuery,
      ) &&
      !selectedValues.some((v) => String(v) === effectiveQuery)
    ) {
      list = [
        { value: effectiveQuery, key: effectiveQuery, label: effectiveQuery },
        ...list,
      ];
    }
    return list;
  }, [
    resolvedOptions,
    filterOption,
    optionFilterProp,
    effectiveQuery,
    isTags,
    selectedValues,
  ]);

  return { resolvedOptions, displayedOptions };
};
