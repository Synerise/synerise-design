import * as React from 'react';
import { SubjectProps } from '@synerise/ds-subject/dist/Subject.types';
import { FactorsProps } from '@synerise/ds-factors/dist/Factors.types';
import { OperatorsProps } from '@synerise/ds-operators/dist/Operator.types';
import { ContextProps } from '@synerise/ds-context-selector/dist/ContextSelector.types';

export type StepConditions = {
  id: React.ReactText;
  parameter?: FactorsProps;
  operator?: OperatorsProps;
  factor?: FactorsProps;
};

export type ConditionStep = {
  id: React.ReactText;
  subject?: SubjectProps;
  context?: ContextProps;
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
};
