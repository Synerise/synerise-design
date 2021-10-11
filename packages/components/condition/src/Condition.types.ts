import * as React from 'react';
import { SubjectItem, SubjectProps } from '@synerise/ds-subject/dist/Subject.types';
import { FactorsProps, FactorType, FactorValueType } from '@synerise/ds-factors/dist/Factors.types';
import { OperatorsItem, OperatorsProps } from '@synerise/ds-operators/dist/Operator.types';
import { ContextGroup, ContextItem, ContextProps } from '@synerise/ds-context-selector/dist/ContextSelector.types';

export type StepConditions = {
  id: React.ReactText;
  parameter?: Omit<FactorsProps, 'onChangeValue'>;
  operator?: Omit<OperatorsProps, 'onChange'>;
  factor?: Omit<FactorsProps, 'onChangeValue' | 'setSelectedFactorType'>;
};

export type ConditionStep = {
  id: React.ReactText;
  subject?: Omit<SubjectProps, 'onSelectItem'>;
  context?: Omit<ContextProps, 'onSelectItem'>;
  stepName?: string;
  conditions: StepConditions[];
};

export type ConditionTexts = {
  stepNamePlaceholder: string;
  removeConditionRowTooltip: string;
  addFirstConditionRowButton: string;
  addConditionRowButton: string;
  addStep: string | React.ReactNode;
  dropLabel: string;
  moveTooltip: string;
  duplicateTooltip: string;
  removeTooltip: string;
};

export type ConditionProps = {
  steps: ConditionStep[];
  addCondition?: (stepId: React.ReactText) => void;
  removeCondition?: (stepId: React.ReactText, conditionRowId: React.ReactText) => void;
  updateStepName?: (stepId: React.ReactText, value: string) => void;
  removeStep?: (stepId: React.ReactText) => void;
  duplicateStep?: (stepId: React.ReactText) => void;
  addStep?: () => void;
  onChangeOrder?: (newOrder: ConditionStep[]) => void;
  texts?: Partial<ConditionTexts>;
  minConditionsLength?: number;
  autoClearCondition?: boolean;
  onChangeContext: (stepId: React.ReactText, value: ContextItem | ContextGroup | undefined) => void;
  onChangeSubject: (stepId: React.ReactText, value: SubjectItem | undefined) => void;
  onChangeParameter: (
    stepId: React.ReactText,
    conditionId: React.ReactText,
    value: FactorValueType | undefined
  ) => void;
  onChangeOperator: (stepId: React.ReactText, conditionId: React.ReactText, value: OperatorsItem | undefined) => void;
  onChangeFactorValue: (
    stepId: React.ReactText,
    conditionId: React.ReactText,
    value: FactorValueType | undefined
  ) => void;
  onChangeFactorType: (stepId: React.ReactText, conditionId: React.ReactText, value: FactorType | undefined) => void;
};
