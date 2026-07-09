import type { ReactNode } from 'react';

import type { AutocompleteOption } from '../Autocomplete.types';

export type AutocompleteDropdownProps = {
  options: AutocompleteOption[];
  notFoundContent?: ReactNode;
  visibleRows?: number;
  rowHeight?: number;
  onSelect: (value: string) => void;
};
