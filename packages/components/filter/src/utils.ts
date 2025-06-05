import type { Expression, StepType } from './Filter.types';

export const isStepType = (expression: Expression): expression is StepType => {
  return expression.type === 'STEP';
};
