import type { ReactText } from 'react';
import type { FactorsProps, FactorValueComponentProps } from '@synerise/ds-factors';
import type { OperatorsProps } from '@synerise/ds-operators';
import type { ConditionProps, ConditionTexts } from '../../Condition.types';

export type ConditionRowProps = Pick<
  ConditionProps,
  'removeCondition' | 'getPopupContainerOverride' | 'factorParameterSelectorComponent' | 'parameterSelectorComponent'
> & {
  index: number;
  error?: boolean;
  hasPriority?: boolean;
  onActivate?: (fieldType: string) => void;
  onDeactivate?: () => void;
  conditionId: ReactText;
  addCondition?: (stepId: ReactText) => void;
  conditionParameter?: Omit<FactorsProps, 'onChangeValue'>;
  conditionOperator?: Omit<OperatorsProps, 'onChange'>;
  conditionFactor?: Omit<FactorsProps, 'onChangeValue'>;
  conditionsNumber: number;
  stepId: ReactText;
  currentStepId: ReactText;
  currentConditionId: ReactText;
  currentField: ReactText;
  minConditionLength: ConditionProps['minConditionsLength'];
  maxConditionLength: ConditionProps['maxConditionsLength'];
  selectParameter: ConditionProps['onChangeParameter'];
  selectOperator: ConditionProps['onChangeOperator'];
  setStepConditionFactorType: ConditionProps['onChangeFactorType'];
  setStepConditionFactorValue: ConditionProps['onChangeFactorValue'];
  texts: Partial<ConditionTexts>;
  stepType: 'event' | 'attribute' | 'default' | undefined;
  inputProps?: Partial<FactorValueComponentProps>;
  readOnly?: boolean;
};
