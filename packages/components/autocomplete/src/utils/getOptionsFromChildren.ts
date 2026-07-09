import { Children, type ReactNode, isValidElement } from 'react';

import type { AutocompleteOption } from '../Autocomplete.types';
import { Option, type OptionProps } from '../Option';

/**
 * Maps declarative `<Autocomplete.Option>` children to the internal option
 * shape. Only direct `Option` children are considered; anything else is ignored.
 */
export const getOptionsFromChildren = (
  children: ReactNode,
): AutocompleteOption[] => {
  const options: AutocompleteOption[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== Option) {
      return;
    }
    const { value, disabled, children: label } = child.props as OptionProps;
    options.push({ value, disabled, label });
  });

  return options;
};
