import * as React from 'react';
import { FilterValue } from '../RangeFilter.types';

export type FilterDropdownProps = {
  filters: FilterValue[];
  onFilterSelect: (filter: FilterValue) => void;
  label: React.ReactNode | string;
};
