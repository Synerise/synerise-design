import type { ReactNode } from 'react';

import type { AutocompleteOption } from '../Autocomplete.types';

export type AutocompleteDropdownProps = {
  options: AutocompleteOption[];
  notFoundContent?: ReactNode;
  visibleRows?: number;
  onSelect: (value: string) => void;
};
