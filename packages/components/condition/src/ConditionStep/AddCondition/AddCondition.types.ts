import type React from 'react';

import { type ConditionTexts } from '../../Condition.types';

export type AddConditionProps = {
  addCondition: (stepId: React.ReactText) => void;
  stepId: React.ReactText;
  conditionsNumber: number;
  texts: Partial<ConditionTexts>;
  isDisabled?: boolean;
  errorText?: React.ReactNode | string;
};
