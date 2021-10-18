import { ConditionProps, ConditionTexts } from '../../Condition.types';

export type AddConditionProps = {
  addCondition: ConditionProps['addCondition'];
  stepId: React.ReactText;
  conditionsNumber: number;
  texts: Partial<ConditionTexts>;
  selectedSubject: boolean;
  selectedContext: boolean;
};
