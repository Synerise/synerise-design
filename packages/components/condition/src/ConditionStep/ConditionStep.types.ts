import type { ReactText } from 'react';

import type { ContextGroup, ContextItem } from '@synerise/ds-context-selector';
import type { FactorType, FactorValueType } from '@synerise/ds-factors';
import type { OperatorsGroup, OperatorsItem } from '@synerise/ds-operators';
import type { SubjectItem } from '@synerise/ds-subject';

import type { ConditionProps, ConditionStep } from '../Condition.types';

export type ConditionStepProps = Pick<
  ConditionProps,
  | 'singleStepCondition'
  | 'showActionAttribute'
  | 'showEmptyConditionPlaceholder'
  | 'showSuffix'
  | 'readOnly'
  | 'inputProps'
  | 'hoverDisabled'
  | 'getPopupContainerOverride'
  | 'minConditionsLength'
  | 'addCondition'
  | 'removeCondition'
  | 'texts'
  | 'maxConditionsLength'
  | 'contextSelectorComponent'
  | 'factorParameterSelectorComponent'
  | 'parameterSelectorComponent'
  | 'actionAttributeParameterSelectorComponent'
> & {
  index: number;
  isLast?: boolean;
  isDragged?: boolean;
  step: ConditionStep;
  hasPriority?: boolean;
  onStepActivate?: (stepid: ReactText) => void;
  updateStepName?: (stepId: ReactText, value: string) => void;
  draggableEnabled?: boolean;
  selectSubject: (value: SubjectItem, stepId: ReactText) => void;
  selectContext: (
    value: ContextItem | ContextGroup | undefined,
    stepId: ReactText,
  ) => void;
  selectActionAttribute: (
    value: FactorValueType | undefined,
    stepId: ReactText,
  ) => void;
  selectParameter: (
    stepId: ReactText,
    condition: ReactText,
    value: FactorValueType | undefined,
  ) => void;
  selectOperator: (
    stepId: ReactText,
    condition: ReactText,
    value: OperatorsItem | OperatorsGroup | undefined,
  ) => void;
  setStepConditionFactorType: (
    stepId: ReactText,
    condition: ReactText,
    factorType: FactorType | undefined,
  ) => void;
  setStepConditionFactorValue: (
    stepId: ReactText,
    condition: ReactText,
    value: FactorValueType,
  ) => void;
  currentStepId: ReactText;
  currentConditionId: ReactText;
  currentField: ReactText;
  setCurrentField: (field: string) => void;
  setCurrentCondition: (conditionId: string) => void;
  setCurrentStep: (stepId: ReactText) => void;
  onDeactivate: () => void;
} & ConditionStepCrudActions;

export type ConditionStepCrudActions = {
  removeStep?: (stepId: ReactText) => void;
  duplicateStep?: (stepId: ReactText) => void;
};
