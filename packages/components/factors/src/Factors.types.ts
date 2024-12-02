import type { ReactText, ReactNode, ElementType } from 'react';

import type { DateFilter } from '@synerise/ds-date-range-picker/dist/date.types';
import type { Texts as DateRangeTexts } from '@synerise/ds-date-range-picker/dist/DateRangePicker.types';
import type { MenuItemProps } from '@synerise/ds-menu';
import type { AutoResizeProp } from '@synerise/ds-input';
import type { InformationCardProps } from '@synerise/ds-information-card';
import type { ListItemProps } from '@synerise/ds-list-item';
import type { LiteralStringUnion, DeepPartial } from '@synerise/ds-utils';

export const ALL_FACTOR_TYPES = [
  'text',
  'number',
  'parameter',
  'contextParameter',
  'dynamicKey',
  'formula',
  'array',
  'date',
  'dateRange',
] as const;
export type FactorType = LiteralStringUnion<typeof ALL_FACTOR_TYPES[number]>;
export type DefinedFactorTypes = typeof ALL_FACTOR_TYPES[number];
export type DynamicKeyValueType = { key: ReactText; value: ReactText };
export type FormulaValueType = { name: string; value: string };
export type ParameterValueType = Pick<ListItemProps, 'renderHoverTooltip' | 'hoverTooltipProps' | 'disabled'> & {
  type: string;
  icon: ReactNode;
  name: string;
  id: ReactText;
  groupId?: ReactText;
  description?: string;
  value?: React.ReactText | null;
  informationCardProps?: Partial<InformationCardProps>;
};

export type ParameterGroup = {
  id: ReactText;
  name: string;
  defaultGroup?: boolean;
  icon?: ReactNode;
  allowEmpty?: boolean;
  subGroups?: ParameterGroup[];
  groupName?: string;
};

export type ParameterItem = {
  id: ReactText;
  name: string;
  groupId?: React.ReactText;
  groupName?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  excludeFromSearchResults?: boolean;
};

export type FactorValueType =
  | string
  | number
  | null
  | Date
  | undefined
  | DynamicKeyValueType
  | FormulaValueType
  | ParameterValueType
  | Partial<DateFilter>;

export type SelectedFactorType = {
  name: string;
  icon: ReactNode;
  input: ElementType;
};

export type FactorsTexts = {
  dateRangePicker: DateRangeTexts;
  datePicker: {
    apply: string;
    clearTooltip: string;
    inputPlaceholder: string;
    now: string;
  };
  dynamicKey: {
    keyPlaceholder: string;
    valuePlaceholder: string;
  };
  formula: {
    buttonPlaceholder: string;
    defaultName: string;
  };
  parameter: {
    searchPlaceholder: string;
    noResults: string;
    loadingParameter: string;
    showMore: string;
    recentItemsGroupName: string;
    allItemsGroupName: string;
  };
  valuePlaceholder: string;
  modalApply: string;
  modalCancel: string;
  modalTitle: string;
  factorTypes: {
    [k in DefinedFactorTypes]: string;
  };
};

export type FactorsProps = {
  factorKey?: ReactText;
  error?: boolean;
  errorText?: ReactNode;
  withoutTypeSelector?: boolean;
  setSelectedFactorType?: (factor: FactorType) => void;
  unavailableFactorTypes?: FactorType[];
  availableFactorTypes?: FactorType[];
  selectedFactorType: FactorType;
  defaultFactorType: FactorType;
  getPopupContainerOverride?: (trigger: HTMLElement | null) => HTMLElement;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onChangeValue: (value: FactorValueType) => void;
  value: FactorValueType;
  textType?: LiteralStringUnion<'autocomplete' | 'expansible' | 'default'>;
  autoResize?: AutoResizeProp;
  includeTimezoneOffset?: true | string;
  autocompleteText?: {
    options: string[];
  };
  parameters?: {
    buttonLabel: ReactNode;
    buttonIcon: ReactNode;
    selectedButtonColored?: boolean;
    groups?: ParameterGroup[];
    items: ParameterItem[];
    recentItems?: ParameterItem[];
    renderEmptyGroups?: boolean;
    // @deprecated
    showAllGroup?: boolean;
    dropdownDimensionsConfig?: {
      defaultHeight?: number;
      lowerHeight?: number;
      threshold?: number;
    };
  };
  onParamsClick?: () => void;
  formulaEditor?: ReactNode;
  texts?: DeepPartial<FactorsTexts>;
  opened?: boolean;
  allowClear?: boolean;
  loading?: boolean;
  preventAutoloadData?: boolean;
  withCustomFactor?: ReactNode;
  inputProps?: Partial<InputProps>;
  readOnly?: boolean;
  getMenuEntryProps?: (arg?: ParameterValueType) => MenuItemProps;
};

export type FactorTypeSelectorProps = Pick<
  FactorsProps,
  'unavailableFactorTypes' | 'availableFactorTypes' | 'selectedFactorType' | 'readOnly'
> & {
  setSelectedFactorType: (factor: FactorType) => void;
  selectedFactor: SelectedFactorType;
  texts: {
    [k in DefinedFactorTypes]: string;
  };
};

export type FactorValueProps = Pick<
  FactorsProps,
  | 'onChangeValue'
  | 'onParamsClick'
  | 'value'
  | 'selectedFactorType'
  | 'parameters'
  | 'autocompleteText'
  | 'withoutTypeSelector'
  | 'textType'
  | 'formulaEditor'
  | 'opened'
  | 'loading'
  | 'factorKey'
  | 'preventAutoloadData'
  | 'getPopupContainerOverride'
  | 'onActivate'
  | 'onDeactivate'
  | 'error'
  | 'allowClear'
  | 'inputProps'
  | 'autoResize'
  | 'readOnly'
  | 'getMenuEntryProps'
  | 'includeTimezoneOffset'
> & {
  texts: FactorsTexts;
  selectedFactor: SelectedFactorType;
};

export type InputProps = Pick<
  FactorsProps,
  | 'value'
  | 'parameters'
  | 'allowClear'
  | 'autocompleteText'
  | 'withoutTypeSelector'
  | 'textType'
  | 'opened'
  | 'getPopupContainerOverride'
  | 'onActivate'
  | 'onDeactivate'
  | 'error'
  | 'inputProps'
  | 'autoResize'
  | 'readOnly'
  | 'getMenuEntryProps'
  | 'includeTimezoneOffset'
> & {
  texts: FactorsTexts;
  onChange: (value: FactorValueType) => void;
  factorType: FactorType;
  onParamsClick?: () => void;
  formulaEditor?: ReactNode;
  loading?: boolean;
  preventAutoloadData?: boolean;
};

export type TextModalProps = {
  value: string;
  onApply: (value: string) => void;
  visible: boolean;
  onCancel: () => void;
  texts: FactorsTexts;
};

export type ParameterDropdownProps = {
  setDropdownVisible: (show: boolean) => void;
  setSelected: (val: ParameterItem) => void;
  groups?: ParameterGroup[];
  items?: ParameterItem[];
  recentItems?: ParameterItem[];
  value?: ParameterValueType;
  texts: FactorsTexts;
  loading?: boolean;
  onFetchData?: () => void;
  hasMoreItems?: boolean;
  outerHeight?: number;
  renderEmptyGroups?: boolean;
  maxSearchResultsInGroup?: number;
};

export type FormulaModalProps = {
  value: FormulaValueType;
  onApply: (value: FormulaValueType) => void;
  visible: boolean;
  onCancel: () => void;
  texts: FactorsTexts;
  formulaEditor?: ReactNode;
};
