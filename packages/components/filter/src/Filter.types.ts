import * as React from 'react';
import { LogicOperator, LogicOperatorValue, LogicProps } from '@synerise/ds-logic/src/Logic.types';
import { StepCardProps } from '@synerise/ds-step-card/src/StepCard.types';
import { MatchingProps, MatchingTexts } from '@synerise/ds-logic/src/Matching/Matching.types';

export type LogicType = {
  type: 'LOGIC';
  id: string;
  data: Partial<LogicProps>;
};

export type StepType = {
  type: 'STEP';
  id: string;
  data: Partial<StepCardProps>;
  logic?: LogicType;
  expressionType?: 'attribute' | 'event';
};

export type Expression = LogicType | StepType;

export type addFilterComponentProps = {
  isLimitExceeded: boolean;
};

export type FilterProps = {
  maxConditionsLimit?: number;
  expressions: Expression[];
  matching?: MatchingProps;
  onChangeOrder: (newOrder: Expression[]) => void;
  onChangeLogic: (id: string, logic: LogicOperatorValue) => void;
  onChangeStepMatching: (id: string, matching: boolean) => void;
  onChangeStepName: (id: string, name: string) => void;
  onDeleteStep: (id: string) => void;
  onDuplicateStep: (id: string) => void;
  renderStepFooter?: (expression: Expression) => React.ReactNode;
  renderStepContent?: (expression: Expression, hoverDisabled?: boolean) => React.ReactNode;
  addFilterComponent?: React.ReactNode | ((arg: addFilterComponentProps) => React.ReactNode);
  logicOptions?: LogicOperator[];
  readOnly?: boolean;
  texts?: {
    matching?: MatchingTexts;
    step?: {
      matching?: string;
      notMatching?: string;
      have?: string;
      performed?: string;
      notHave?: string;
      notPerformed?: string;
      attribute?: string;
      event?: string;
      notAttribute?: string;
      notEvent?: string;
      namePlaceholder?: string;
      moveTooltip?: string;
      deleteTooltip?: string;
      duplicateTooltip?: string;
    };
    placeholder?: {
      chooseCondition?: string;
      getPreview?: string;
    };
    addFilter?: string;
    dropMeHere?: string;
    overwritten?: {
      filterTitle?: string;
    };
  };
  visibilityConfig?: {
    isStepCardHeaderVisible?: boolean;
  };
};
