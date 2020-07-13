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

export type SearchProps<T extends {}> = {
  clearTooltip: string;
  divider?: React.ReactNode;
  dropdownMaxHeight?: number;
  elementTextLookupKey: string;
  elementFilterLookupKey?: string;
  onParameterValueChange: (parameterValue: string) => void;
  onValueChange: (value: string) => void;
  parameters: T[];
  parametersDisplayProps: DataSetProps;
  parameterValue: string;
  placeholder: string;
  recent: T[];
  recentDisplayProps: DataSetProps;
  style?: React.CSSProperties;
  suggestions?: T[];
  suggestionsDisplayProps?: DataSetProps;
  value: string;
  width?: number;
};

export type SearchState<T extends {}> = {
  isInputOpen: boolean;
  label: T | null;
  filteredParameters: T[];
  filteredRecent: T[];
  filteredSuggestions?: T[];
  isListVisible: boolean;
  focusInputTrigger: boolean;
  toggleInputTrigger: boolean;
  isResultChosen: boolean;
  itemsListWidth: number;
};
