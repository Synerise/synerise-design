import type { ComponentType, ReactNode, ReactText } from 'react';

import type {
  ContextGroup,
  ContextItem,
  ContextProps,
} from '@synerise/ds-context-selector';
import type {
  FactorType,
  FactorValueComponentProps,
  FactorValueType,
  FactorsProps,
  InputProps,
  ParameterValueType,
} from '@synerise/ds-factors';
import type { OperatorsItem, OperatorsProps } from '@synerise/ds-operators';
import type { SubjectItem, SubjectProps } from '@synerise/ds-subject';

import type { ConditionStepCrudActions } from './ConditionStep/ConditionStep.types';

export type StepConditions = {
  id: ReactText;
  parameter?: Omit<FactorsProps, 'onChangeValue'>;
  operator?: Omit<OperatorsProps, 'onChange'>;
  factor?: Omit<FactorsProps, 'onChangeValue' | 'setSelectedFactorType'> & {
    withCustomFactor?: ReactNode;
  };
};

export type ConditionStep = {
  id: ReactText;
  subject?: Omit<SubjectProps, 'onSelectItem'>;
  context?: Omit<ContextProps, 'onSelectItem'>;
  actionAttribute?: Omit<
    FactorsProps,
    'onChangeValue' | 'selectedFactorType' | 'defaultFactorType'
  >;
  stepName?: string;
  conditions: StepConditions[];
  addConditionErrorText?: ReactNode;
};

export type ConditionTexts = {
  stepNamePlaceholder: string;
  removeConditionRowTooltip: string;
  addFirstConditionRowButton: string;
  addConditionRowButton: string;
  addStep: ReactNode;
  dropLabel: string;
  moveTooltip: string;
  duplicateTooltip: string;
  removeTooltip: string;
  conditionSuffix: string;
  stepNamePrefix: string;
  emptyConditionLabel: string;
};

export type CustomContextSelectorProps = Pick<
  ContextProps,
  | 'onActivate'
  | 'onDeactivate'
  | 'onSelectItem'
  | 'selectedItem'
  | 'opened'
  | 'readOnly'
> & {
  getPopupContainer: ContextProps['getPopupContainerOverride'];
};

export type CustomParameterSelectorProps = Pick<
  FactorsProps,
  'onActivate' | 'onDeactivate' | 'opened' | 'readOnly'
> & {
  getPopupContainer: FactorsProps['getPopupContainerOverride'];
  onSelectItem: FactorsProps['onChangeValue'];
  selectedItem?: ParameterValueType;
};

export type ConditionProps = {
  steps: ConditionStep[];
  getPopupContainerOverride?: (trigger: HTMLElement | null) => HTMLElement;
  addCondition?: (stepId: ReactText) => string | void;
  renderAddStep?: () => ReactNode;
  removeCondition?: (stepId: ReactText, conditionRowId: ReactText) => void;
  addStep?: () => ReactText | void;
  onChangeOrder?: (newOrder: ConditionStep[]) => void;
  texts?: Partial<ConditionTexts>;
  minConditionsLength: number;
  maxConditionsLength?: number | undefined;
  autoClearCondition?: boolean;
  contextSelectorComponent?: ComponentType<CustomContextSelectorProps>;
  parameterSelectorComponent?: ComponentType<FactorValueComponentProps>;
  factorParameterSelectorComponent?: ComponentType<FactorValueComponentProps>;
  actionAttributeParameterSelectorComponent?: ComponentType<FactorValueComponentProps>;
  onChangeContext: (
    stepId: ReactText,
    value: ContextItem | ContextGroup | undefined,
  ) => void;
  onChangeSubject: (stepId: ReactText, value: SubjectItem | undefined) => void;
  onChangeParameter: (
    stepId: ReactText,
    conditionId: ReactText,
    value: FactorValueType | undefined,
  ) => void;
  onChangeOperator: (
    stepId: ReactText,
    conditionId: ReactText,
    value: OperatorsItem | undefined,
  ) => void;
  onChangeFactorValue: (
    stepId: ReactText,
    conditionId: ReactText,
    value: FactorValueType | undefined,
  ) => void;
  onChangeFactorType: (
    stepId: ReactText,
    conditionId: ReactText,
    value: FactorType | undefined,
  ) => void;
  onUpdateStepName?: (stepId: ReactText, value: string) => void;
  onChangeActionAttribute?: (
    stepId: ReactText,
    value: FactorValueType | undefined,
  ) => void;
  type?: 'attribute' | 'event';
  showSuffix?: boolean;
  hoverDisabled?: boolean;
  autoOpenedComponent?:
    | 'subject'
    | 'operator'
    | 'factor'
    | 'parameter'
    | 'context';
  inputProps?: Partial<InputProps>;
  onDeactivate?: (
    currentStepId: ReactText,
    currentConditionId: ReactText,
  ) => void;
  readOnly?: boolean;
  singleStepCondition?: boolean;
  showActionAttribute?: boolean;
  showEmptyConditionPlaceholder?: boolean;
} & ConditionStepCrudActions;
