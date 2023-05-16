import * as React from 'react';
import { ConditionTexts } from '../../Condition.types';

export type AddConditionProps = {
  addCondition: (stepId: React.ReactText) => void;
  stepId: React.ReactText;
  conditionsNumber: number;
  texts: Partial<ConditionTexts>;
  selectedSubject: boolean;
  selectedContext: boolean;
  readOnly?: boolean;
  errorText?: React.ReactNode | string;
};
