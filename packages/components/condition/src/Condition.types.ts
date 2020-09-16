import * as React from 'react';
import { SubjectProps } from '@synerise/ds-subject/dist/Subject.types';
import { FactorsProps } from '@synerise/ds-factors/dist/Factors.types';
import { OperatorsProps } from '@synerise/ds-operators/dist/Operator.types';

export type StepConditions = {
  id: React.ReactText;
  parameter?: FactorsProps;
  operator?: OperatorsProps;
  factor?: FactorsProps;
};

export type ConditionStep = {
  id: React.ReactText;
  subject: SubjectProps;
  stepName?: string;
  conditions: StepConditions[];
};

export type ConditionProps = {
  steps: ConditionStep[];
  addCondition?: (stepId: React.ReactText) => void;
  removeCondition?: (stepId: React.ReactText, conditionRowId: React.ReactText) => void;
  updateStepName?: (stepId: React.ReactText, value: string) => void;
  texts: {
    stepNamePlaceholder: string;
    removeConditionRowTooltip: string;
    addConditionRowButton: string;
  };
};
