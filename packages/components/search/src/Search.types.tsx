import * as React from 'react';

export type FilterElement = {
  text: string;
  filter?: string;
  icon?: React.ReactNode;
};

export type SearchProps = {
  placeholder: string;
  filterTitle?: string;
  recentTitle?: string;
  resultTitle?: string;
  clearTooltip: string | React.ReactNode;
  parameters?: FilterElement[];
  recent?: FilterElement[];
  results: FilterElement[];
  onValueChange: (value: string) => void;
  value: string;
  filterValue: string;
  onFilterValueChange: (value: string) => void;
  divider?: React.ReactNode;
};
