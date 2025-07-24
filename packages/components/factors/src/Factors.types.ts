import type { ComponentType, ReactNode, ReactText } from 'react';

import type { AutocompleteProps } from '@synerise/ds-autocomplete';
import type { CollectorValue } from '@synerise/ds-collector';
import type { Texts as DateRangeTexts } from '@synerise/ds-date-range-picker/dist/DateRangePicker.types';
import type {
  DateFilter,
  RelativeUnits,
} from '@synerise/ds-date-range-picker/dist/date.types';
import type { InformationCardProps } from '@synerise/ds-information-card';
import type { AutoResizeProp, InputProps } from '@synerise/ds-input';
import type { ListItemProps } from '@synerise/ds-list-item';
import type { MenuItemProps } from '@synerise/ds-menu';
import type { DeepPartial, LiteralStringUnion } from '@synerise/ds-utils';

import type { ArrayValueElement } from './FactorValue/Array/Array.types';

export const ALL_FACTOR_TYPES = [
  'text',
  'number',
  'parameter',
  'contextParameter',
  'dynamicKey',
  'formula',
  'array',
  'date',
  'relativeDate',
  'dateRange',
] as const;
export type FactorType = LiteralStringUnion<(typeof ALL_FACTOR_TYPES)[number]>;
export type DefinedFactorTypes = (typeof ALL_FACTOR_TYPES)[number];

export type TupleType = [DefinedFactorTypes, SelectedFactorType];

export type RelativeDateUnit = Exclude<RelativeUnits, 'SINCE'>;
export type RelativeTimeRelation = 'BEFORE' | 'AFTER';
export type RelativeDateValueType = {
  temporalUnit: RelativeDateUnit;
  temporalModifier: number;
};

export type DynamicKeyValueType = { key: ReactText; value: ReactText };
export type FormulaValueType = { name: string; value: string };
export type ParameterValueType = Pick<
  ListItemProps,
  'renderHoverTooltip' | 'hoverTooltipProps' | 'disabled'
> & {
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

export type ArrayItemType = 'string' | 'number';
export type ArrayValue =
  | ArrayValueElement<'string'>[]
  | ArrayValueElement<'number'>[];

export type FactorValueType =
  | string
  | number
  | null
  | Date
  | RelativeDateValueType
  | undefined
  | DynamicKeyValueType
  | FormulaValueType
  | ArrayValue
  | ParameterValueType
  | Partial<DateFilter>;

export type SelectedFactorType = {
  name: string;
  icon: ReactNode;
  component: ComponentType<FactorValueComponentProps>;
};
export const RelativeDateKeysString = [
  'triggerValue',
  'triggerPlaceholder',
  'seconds',
  'minutes',
  'hours',
  'days',
  'weeks',
  'months',
  'years',
  'before',
  'after',
] as const;
export const RelativeDateKeysReactNode = [
  'currentDatetime',
  'apply',
  'cancel',
] as const;

export type RelativeDateFactorTextsString = {
  [K in (typeof RelativeDateKeysString)[number]]: string;
};
export type RelativeDateFactorTexts = RelativeDateFactorTextsString & {
  [K in (typeof RelativeDateKeysReactNode)[number]]: ReactNode;
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
  array: {
    triggerLabel: ReactNode;
    modalTitle: ReactNode;
    emptyTitle: ReactNode;
    emptyDescription: ReactNode;
    emptyResultsTitle: ReactNode;
    emptyResultsDescription: ReactNode;
    searchPlaceholder: string;
    searchClearTooltip: ReactNode;
    limitPrefix: ReactNode;
    collectorPlaceholder: string;
    collectorAdd: ReactNode;
    collectorCancel: ReactNode;
    creatorButtonLabel: ReactNode;
    rawButtonLabel: ReactNode;
    clearButtonLabel: ReactNode;
    deleteItemTooltip: ReactNode;
    numericValidationError: ReactNode;
    limitReached: ReactNode;
    limitExceeded: ReactNode;
    copiedTooltip: ReactNode;
    copyTooltip: ReactNode;
  };
  parameter: {
    searchPlaceholder: string;
    noResults: string;
    loadingParameter: string;
    showMore: string;
    recentItemsGroupName: string;
    allItemsGroupName: string;
  };
  relativeDate: RelativeDateFactorTexts;
  valuePlaceholder: string;
  modalApply: string;
  modalCancel: string;
  modalTitle: string;
  factorTypes: {
    [k in DefinedFactorTypes]: string;
  };
};

export type FactorTypeMapping = Record<
  DefinedFactorTypes,
  Partial<SelectedFactorType>
>;
export type MergedFactorTypeMapping = Record<
  DefinedFactorTypes,
  SelectedFactorType
>;

type InputPropKeys = 'icon1' | 'icon1Tooltip' | 'icon2' | 'icon2Tooltip';
export type ExtraPropsMapping = {
  text: {
    inputProps?: Pick<InputProps, InputPropKeys>;
    autoCompleteProps?: Partial<AutocompleteProps>;
  };
  dynamicKey: {
    keyInputProps?: Pick<InputProps, InputPropKeys>;
    valueInputProps?: Pick<InputProps, InputPropKeys>;
  };
  // TODO REMAINING COMPONENTS
};

export type ArrayProps = {
  itemType?: ArrayItemType;
  limit?: number;
  collectorSuggestions?: CollectorValue[];
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
  customFactorValueComponents?: Partial<FactorTypeMapping>;
  factorValueExtraProps?: Partial<ExtraPropsMapping>;
  getPopupContainerOverride?: (trigger: HTMLElement | null) => HTMLElement;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onChangeValue: (value: FactorValueType) => void;
  value: FactorValueType;
  arrayProps?: ArrayProps;
  textType?: 'autocomplete' | 'expansible' | 'default';
  autoResize?: AutoResizeProp;
  relativeDateProps?: {
    triggerValueFormatter?: (value: RelativeDateValueType) => string;
    availableUnits?: RelativeDateUnit[];
  };
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

  inputProps?: Partial<
    Omit<
      InputProps,
      | 'handleInputRef'
      | 'defaultOpen'
      | 'placeholder'
      | 'value'
      | 'onChange'
      | 'onBlur'
      | 'error'
      | 'getPopupContainer'
      | 'readOnly'
      | 'allowClear'
    >
  >;
  readOnly?: boolean;
  getMenuEntryProps?: (arg?: ParameterValueType) => MenuItemProps;
};

export type FactorTypeSelectorProps = Pick<
  FactorsProps,
  | 'unavailableFactorTypes'
  | 'availableFactorTypes'
  | 'selectedFactorType'
  | 'readOnly'
> & {
  setSelectedFactorType: (factor: FactorType) => void;
  selectedFactor: SelectedFactorType;
  factorTypeMapping: FactorTypeMapping;
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
  | 'relativeDateProps'
  | 'arrayProps'
  | 'getMenuEntryProps'
  | 'factorValueExtraProps'
> & {
  texts: FactorsTexts;
  selectedFactor: SelectedFactorType;
};

export type FactorValueComponentProps = Pick<
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
  | 'arrayProps'
  | 'getMenuEntryProps'
  | 'factorValueExtraProps'
> & {
  texts: FactorsTexts;
  onChange: (value: FactorValueType) => void;
  factorType: FactorType;
  onParamsClick?: () => void;
  formulaEditor?: ReactNode;
  loading?: boolean;
  preventAutoloadData?: boolean;
} & FactorsProps['relativeDateProps'];

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
