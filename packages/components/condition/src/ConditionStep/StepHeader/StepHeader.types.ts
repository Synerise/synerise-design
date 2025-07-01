import { type HTMLAttributes, type ReactText } from 'react';

import {
  type ConditionProps,
  type ConditionTexts,
} from '../../Condition.types';

export type StepHeaderProps = {
  index: number;
  texts: ConditionTexts;
  stepName: string;
  stepId: ReactText;
  removeStep: ConditionProps['removeStep'];
  duplicateStep: ConditionProps['duplicateStep'];
  updateStepName: ConditionProps['onUpdateStepName'];
  draggableEnabled: boolean;
  readOnly?: boolean;
  dragHandleProps?: HTMLAttributes<HTMLDivElement>;
};
