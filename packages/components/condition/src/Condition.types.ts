import * as React from 'react';

export type StepConditions = {
  id: React.ReactText;
  parameter?: React.ReactNode;
  operator?: React.ReactNode;
  factor?: React.ReactNode;
};

export type ConditionStep = {
  id: React.ReactText;
  subject: React.ReactNode;
  stepName?: string;
  conditions: StepConditions[];
};

export type ConditionProps = {
  steps: ConditionStep[];
  addCondition?: (stepId: React.ReactText) => void;
  removeCondition?: (stepId: React.ReactText, conditionRowId: React.ReactText) => void;
  updateStepName?: (stepId: React.ReactText, value: string) => void;
};
