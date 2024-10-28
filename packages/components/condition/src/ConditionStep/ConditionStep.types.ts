import { ReactText } from 'react';
import { FactorType, FactorValueType, InputProps } from '@synerise/ds-factors/dist/Factors.types';
import { ContextGroup, ContextItem } from '@synerise/ds-context-selector/dist/ContextSelector.types';
import { SubjectItem } from '@synerise/ds-subject/dist/Subject.types';
import { OperatorsGroup, OperatorsItem } from '@synerise/ds-operators/dist/Operator.types';
import { ConditionStep, ConditionTexts, ConditionProps } from '../Condition.types';

export type ConditionStepProps = {
  index: number;
  step: ConditionStep;
  hasPriority?: boolean;
  onStepActivate?: (stepid: ReactText) => void;
  getPopupContainerOverride?: ConditionProps['getPopupContainerOverride'];
  addCondition?: (stepId: ReactText) => void;
  removeCondition?: (stepId: ReactText, conditionRowId: ReactText) => void;
  updateStepName?: (stepId: ReactText, value: string) => void;
  texts?: Partial<ConditionTexts>;
  minConditionsLength: number;
  maxConditionsLength: number | undefined;
  draggableEnabled?: boolean;
  selectSubject: (value: SubjectItem, stepId: ReactText) => void;
  selectContext: (value: ContextItem | ContextGroup | undefined, stepId: ReactText) => void;
  selectActionAttribute: (value: FactorValueType | undefined, stepId: ReactText) => void;
  selectParameter: (stepId: ReactText, condition: ReactText, value: FactorValueType | undefined) => void;
  selectOperator: (stepId: ReactText, condition: ReactText, value: OperatorsItem | OperatorsGroup | undefined) => void;
  setStepConditionFactorType: (stepId: ReactText, condition: ReactText, factorType: FactorType | undefined) => void;
  setStepConditionFactorValue: (stepId: ReactText, condition: ReactText, value: FactorValueType) => void;
  currentStepId: ReactText;
  currentConditionId: ReactText;
  currentField: ReactText;
  setCurrentField: (field: string) => void;
  setCurrentCondition: (conditionId: string) => void;
  setCurrentStep: (stepId: ReactText) => void;
  onDeactivate: () => void;
  showSuffix?: boolean;
  hoverDisabled?: boolean;
  inputProps?: Partial<InputProps>;
  readOnly?: boolean;
  singleStepCondition?: boolean;
  showActionAttribute?: boolean;
  showEmptyConditionPlaceholder?: boolean;
} & ConditionStepCrudActions;

export type ConditionStepCrudActions = {
  removeStep?: (stepId: ReactText) => void;
  duplicateStep?: (stepId: ReactText) => void;
};
