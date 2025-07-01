import type { ReactNode } from 'react';

import type {
  LogicOperator,
  LogicOperatorValue,
  LogicProps,
  MatchingProps,
  MatchingTexts,
} from '@synerise/ds-logic';
import type { StepCardProps } from '@synerise/ds-step-card';
import type { DeepPartial } from '@synerise/ds-utils';

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

export type FilterTexts = {
  matching: MatchingTexts;
  step: {
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
    moveUpTooltip?: string;
    moveDownTooltip?: string;
    deleteTooltip?: string;
    duplicateTooltip?: string;
  };
  placeholder: {
    chooseCondition?: string;
    getPreview?: string;
  };
  addFilter: string;
  dropMeHere: string;
  overwritten: {
    filterTitle?: string;
  };
};

export type FilterProps = {
  maxConditionsLimit?: number;
  expressions: Expression[];
  matching?: MatchingProps;
  onChangeOrder?: (newOrder: Expression[]) => void;
  onChangeLogic?: (id: string, logic: LogicOperatorValue) => void;
  onChangeStepMatching?: (id: string, matching: boolean) => void;
  onChangeStepName?: (id: string, name: string) => void;
  onDeleteStep?: (id: string) => void;
  onDuplicateStep?: (id: string) => void;
  renderStepFooter?: (expression: Expression) => ReactNode;
  renderStepContent?: (
    expression: Expression,
    hoverDisabled?: boolean,
  ) => ReactNode;
  renderStepHeaderRightSide?: (
    expression: Expression,
    index: number,
    options?: { placeholder?: boolean },
  ) => ReactNode;
  addFilterComponent?:
    | ReactNode
    | ((arg: addFilterComponentProps) => ReactNode);
  logicOptions?: LogicOperator[];
  readOnly?: boolean;
  singleStepCondition?: boolean;
  renderHeaderRightSide?: (expressions: Expression[]) => ReactNode;
  getMoveByLabel?: (moveByOffset: number) => string;
  texts?: DeepPartial<FilterTexts>;
  visibilityConfig?: {
    isStepCardHeaderVisible?: boolean;
  };
};
