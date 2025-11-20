import { type InputProps } from 'antd/lib/input';
import type React from 'react';
import { type ListProps } from 'react-window';

import { type TooltipProps } from '@synerise/ds-tooltip';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

export type DataSetProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemRender: (item: any) => JSX.Element;
  rowHeight: number;
  title: string;
  tooltip?: string;
  visibleRows?: number;
  listProps?: Partial<ListProps>;
};

export type SearchLookupConfig<T extends AnyObject, U extends AnyObject> = {
  parameters: keyof U;
  recent: keyof T;
  suggestions: keyof T;
};

export type SearchProps<T extends AnyObject, U extends AnyObject> = {
  clearTooltip: string;
  divider?: React.ReactNode;
  dropdownMaxHeight: number;
  filterLookupKey?: string;
  inputProps?: InputProps;
  onClear: () => void;
  onParameterValueChange: (parameterValue: string, parameter: U | null) => void;
  onValueChange: (value: string) => void;
  parameters: U[];
  parametersDisplayProps: DataSetProps;
  parameterValue: string;
  placeholder: string;
  recent: T[];
  recentDisplayProps: DataSetProps;
  style?: React.CSSProperties;
  suggestions?: T[] | null;
  suggestionsDisplayProps?: DataSetProps | null;
  textLookupConfig: SearchLookupConfig<T, U>;
  value: string;
  /** @deprecated - use searchWidth instead */
  width?: number;
  /** @description - by default the suggestions dropdown will match the search input width, provide `dropdownWidth` param if you want to customise dropdown width  */
  searchWidth?: number;
  /** @description - by default the suggestions dropdown will match the search input width, provide `dropdownWidth` param if you want to customise dropdown width  */
  dropdownWidth?: number;
  hideLabel?: boolean;
  disableInput?: boolean;
  alwaysExpanded?: boolean;
  searchTooltipProps?: TooltipProps;
};

export enum SelectResultDataKeys {
  RECENT = 'recent',
  SUGGESTIONS = 'suggestions',
}
