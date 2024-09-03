import { ReactText, ReactNode } from 'react';
import { SubjectItem, SubjectProps } from '@synerise/ds-subject/dist/Subject.types';
import { FactorsProps, FactorType, FactorValueType, InputProps } from '@synerise/ds-factors/dist/Factors.types';
import { OperatorsItem, OperatorsProps } from '@synerise/ds-operators/dist/Operator.types';
import { ContextGroup, ContextItem, ContextProps } from '@synerise/ds-context-selector/dist/ContextSelector.types';
import type { ConditionStepCrudActions } from './ConditionStep/ConditionStep.types';

export type StepConditions = {
  id: ReactText;
  parameter?: Omit<FactorsProps, 'onChangeValue'>;
  operator?: Omit<OperatorsProps, 'onChange'>;
  factor?: Omit<FactorsProps, 'onChangeValue' | 'setSelectedFactorType'>;
};

export type ConditionStep = {
  id: ReactText;
  subject?: Omit<SubjectProps, 'onSelectItem'>;
  context?: Omit<ContextProps, 'onSelectItem'>;
  stepName?: string;
  conditions: StepConditions[];
  addConditionErrorText?: ReactNode;
};

export type ConditionTexts = {
  stepNamePlaceholder: string;
  removeConditionRowTooltip: string;
  addFirstConditionRowButton: string;
  addConditionRowButton: string;
  addStep: ReactNode;
  dropLabel: string;
  moveTooltip: string;
  duplicateTooltip: string;
  removeTooltip: string;
  conditionSuffix: string;
  stepNamePrefix: string;
};

export type ConditionProps = {
  steps: ConditionStep[];
  getPopupContainerOverride?: (trigger: HTMLElement | null) => HTMLElement;
  addCondition?: (stepId: ReactText) => string | void;
  renderAddStep?: () => ReactNode;
  removeCondition?: (stepId: ReactText, conditionRowId: ReactText) => void;
  addStep?: () => ReactText | void;
  onChangeOrder?: (newOrder: ConditionStep[]) => void;
  texts?: Partial<ConditionTexts>;
  minConditionsLength: number;
  maxConditionsLength?: number | undefined;
  autoClearCondition?: boolean;
  onChangeContext: (stepId: ReactText, value: ContextItem | ContextGroup | undefined) => void;
  onChangeSubject: (stepId: ReactText, value: SubjectItem | undefined) => void;
  onChangeParameter: (stepId: ReactText, conditionId: ReactText, value: FactorValueType | undefined) => void;
  onChangeOperator: (stepId: ReactText, conditionId: ReactText, value: OperatorsItem | undefined) => void;
  onChangeFactorValue: (stepId: ReactText, conditionId: ReactText, value: FactorValueType | undefined) => void;
  onChangeFactorType: (stepId: ReactText, conditionId: ReactText, value: FactorType | undefined) => void;
  onUpdateStepName?: (stepId: ReactText, value: string) => void;
  type?: 'attribute' | 'event';
  showSuffix?: boolean;
  hoverDisabled?: boolean;
  autoOpenedComponent?: 'subject' | 'operator' | 'factor' | 'parameter' | 'context';
  inputProps?: Partial<InputProps>;
  onDeactivate?: (currentStepId: ReactText, currentConditionId: ReactText) => void;
  readOnly?: boolean;
} & ConditionStepCrudActions;
