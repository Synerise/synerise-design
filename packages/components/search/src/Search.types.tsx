import * as React from 'react';

export type DataSetProps = {
  title: string;
  tooltip: string;
  rowHeight: number;
  visibleRows: number;
  itemRender: (item: object) => JSX.Element;
};

export type SearchLookupConfig = {
  parameters: string;
  recent: string;
  suggestions: string;
};

export type SearchProps<T extends {}> = {
  clearTooltip: string;
  divider?: React.ReactNode;
  dropdownMaxHeight?: number;
  filterLookupKey?: string;
  onParameterValueChange: (parameterValue: string) => void;
  onValueChange: (value: string) => void;
  parameters: T[];
  parametersDisplayProps: DataSetProps;
  parameterValue: string;
  placeholder: string;
  recent: T[];
  recentDisplayProps: DataSetProps;
  style?: React.CSSProperties;
  suggestions?: T[] | null;
  suggestionsDisplayProps?: DataSetProps | null;
  textLookupConfig: SearchLookupConfig;
  value: string;
  width?: number;
};

export type SearchState<T extends {}> = {
  isInputOpen: boolean;
  label: T | null;
  filteredParameters: T[];
  filteredRecent: T[];
  filteredSuggestions?: T[] | null;
  isListVisible: boolean;
  focusInputTrigger: boolean;
  toggleInputTrigger: boolean;
  isResultChosen: boolean;
  itemsListWidth: number;
};

export enum SelectResultDataKeys {
  RECENT = 'recent',
  SUGGESTIONS = 'suggestions',
}
