import * as React from 'react';
import { FactorType, FactorValueType } from '@synerise/ds-factors/dist/Factors.types';
import { ContextGroup, ContextItem } from '@synerise/ds-context-selector/dist/ContextSelector.types';
import { SubjectItem } from '@synerise/ds-subject/dist/Subject.types';
import { OperatorsGroup, OperatorsItem } from '@synerise/ds-operators/dist/Operator.types';
import { ConditionStep, ConditionTexts } from '../Condition.types';

export type ConditionStepProps = {
  index: number;
  step: ConditionStep;
  addCondition?: (stepId: React.ReactText) => void;
  removeCondition?: (stepId: React.ReactText, conditionRowId: React.ReactText) => void;
  updateStepName?: (stepId: React.ReactText, value: string) => void;
  removeStep?: (stepId: React.ReactText) => void;
  duplicateStep?: (stepId: React.ReactText) => void;
  texts?: Partial<ConditionTexts>;
  minConditionsLength?: number;
  draggableEnabled?: boolean;
  selectSubject: (value: SubjectItem, stepId: React.ReactText) => void;
  selectContext: (value: ContextItem | ContextGroup | undefined, stepId: React.ReactText) => void;
  selectParameter: (stepId: React.ReactText, condition: React.ReactText, value: FactorValueType | undefined) => void;
  selectOperator: (
    stepId: React.ReactText,
    condition: React.ReactText,
    value: OperatorsItem | OperatorsGroup | undefined
  ) => void;
  setStepConditionFactorType: (
    stepId: React.ReactText,
    condition: React.ReactText,
    factorType: FactorType | undefined
  ) => void;
  setStepConditionFactorValue: (stepId: React.ReactText, condition: React.ReactText, value: FactorValueType) => void;
  currentStepId: React.ReactText;
  currentConditionId: React.ReactText;
  currentField: React.ReactText;
};
