import * as React from 'react';

export type FilterElement = {
  text: string;
  filter?: string;
  icon?: React.ReactNode;
};
export type DataSetProps = {
  title: string;
  tooltip: string;
  rowHeight: number;
  visibleRows: number;
  itemRender: (item: FilterElement) => React.ReactElement;
};
export type SearchProps = {
  placeholder: string;
  clearTooltip: string;
  parameters?: FilterElement[];
  recent?: FilterElement[];
  suggestions: FilterElement[];
  onValueChange: (value: string) => void;
  value: string;
  parameterValue: string;
  onParameterValueChange: (parameterValue: string) => void;
  width?: number;
  dropdownMaxHeight?: number;
  recentDisplayProps: DataSetProps;
  suggestionsDisplayProps: DataSetProps;
  parametersDisplayProps: DataSetProps;
  divider?: React.ReactNode;
};
