import React from 'react';
import { ConditionProps, ConditionTexts } from '../../Condition.types';

export type StepHeaderProps = {
  index: number;
  texts: Partial<ConditionTexts>;
  stepName: string;
  stepId: React.ReactText;
  removeStep: ConditionProps['removeStep'];
  duplicateStep: ConditionProps['duplicateStep'];
  updateStepName: ConditionProps['onUpdateStepName'];
  draggableEnabled: boolean;
  readOnly?: boolean;
};
