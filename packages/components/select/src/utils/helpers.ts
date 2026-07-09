import {
  type FilterOptionFn,
  type RawValueType,
  type SelectValue,
} from '../Select.types';

/** Default max height (px) of the option list. */
export const DEFAULT_LIST_HEIGHT = 256;

/** Join truthy class names into a single string. */
export const cx = (...classes: (string | false | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

/** Normalise a `SelectValue` to an array of raw values. */
export const toArray = (value: SelectValue): RawValueType[] => {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

/** Built-in filter: case-insensitive substring on `optionFilterProp` (or label/value). */
export const defaultFilter =
  (optionFilterProp?: string): FilterOptionFn =>
  (input, option) => {
    const haystack =
      optionFilterProp === 'value'
        ? String(option.value)
        : typeof option.label === 'string'
          ? option.label
          : String(option.value);
    return haystack.toLowerCase().includes(input.toLowerCase());
  };
