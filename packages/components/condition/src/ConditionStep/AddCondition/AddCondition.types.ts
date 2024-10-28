import React from 'react';
import { ConditionTexts } from '../../Condition.types';

export type AddConditionProps = {
  addCondition: (stepId: React.ReactText) => void;
  stepId: React.ReactText;
  conditionsNumber: number;
  texts: Partial<ConditionTexts>;
  isDisabled?: boolean;
  errorText?: React.ReactNode | string;
};
