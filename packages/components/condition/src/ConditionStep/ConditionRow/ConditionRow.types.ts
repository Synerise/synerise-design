import * as React from 'react';
import { FactorsProps } from '@synerise/ds-factors/dist/Factors.types';
import { OperatorsProps } from '@synerise/ds-operators/dist/Operator.types';
import { ConditionProps, ConditionTexts } from '../../Condition.types';

export type ConditionRowProps = {
  index: number;
  conditionId: React.ReactText;
  addCondition: ConditionProps['addCondition'];
  conditionParameter: FactorsProps;
  conditionOperator: OperatorsProps;
  conditionFactor: FactorsProps;
  removeCondition: ConditionProps['removeCondition'];
  minConditionLength: ConditionProps['minConditionsLength'];
  maxConditionLength: ConditionProps['maxConditionsLength'];
  conditionsNumber: number;
  stepId: React.ReactText;
  currentStepId: React.ReactText;
  currentConditionId: React.ReactText;
  currentField: React.ReactText;
  selectParameter: ConditionProps['onChangeParameter'];
  selectOperator: ConditionProps['onChangeOperator'];
  setStepConditionFactorType: ConditionProps['onChangeFactorType'];
  setStepConditionFactorValue: ConditionProps['onChangeFactorValue'];
  getPopupContainerOverride?: ConditionProps['getPopupContainerOverride'];
  texts: Partial<ConditionTexts>;
  stepType: 'event' | 'attribute' | 'default' | undefined;
};