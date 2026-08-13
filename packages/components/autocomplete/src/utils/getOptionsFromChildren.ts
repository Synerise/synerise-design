import {
  Children,
  Fragment,
  type ReactElement,
  type ReactNode,
  isValidElement,
} from 'react';

import type { AutocompleteOption } from '../Autocomplete.types';
import { Option, type OptionProps } from '../Option';

type OptionMarker = { displayName?: string; isAutocompleteOption?: boolean };

const isOptionElement = (child: ReactElement): boolean => {
  if (child.type === Option) {
    return true;
  }
  // Reference equality alone is not enough: a duplicate copy of this package in a
  // consumer bundle, a module mock, or a memo/forwardRef wrapper all produce a
  // different function object for the same component.
  const marker = child.type as OptionMarker;
  return (
    marker?.isAutocompleteOption === true ||
    marker?.displayName === Option.displayName
  );
};

/**
 * Maps declarative `<Autocomplete.Option>` children to the internal option shape.
 * Fragments and nested arrays are traversed; anything else is ignored.
 */
export const getOptionsFromChildren = (
  children: ReactNode,
): AutocompleteOption[] => {
  const options: AutocompleteOption[] = [];

  const collect = (nodes: ReactNode): void => {
    Children.forEach(nodes, (child) => {
      if (!isValidElement(child)) {
        return;
      }
      // `Children.forEach` flattens arrays but stops at a Fragment boundary.
      if (child.type === Fragment) {
        collect((child.props as { children?: ReactNode }).children);
        return;
      }
      if (!isOptionElement(child)) {
        return;
      }
      const { value, disabled, children: label } = child.props as OptionProps;
      // antd/rc-select parity: an option declared with only a `key` still selects.
      if (value === undefined && child.key === null) {
        return;
      }
      options.push({
        value: value !== undefined ? value : String(child.key),
        disabled,
        label,
      });
    });
  };

  collect(children);

  return options;
};
