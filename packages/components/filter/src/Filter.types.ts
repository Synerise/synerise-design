import * as React from 'react';
import { LogicOperatorValue, LogicProps } from '@synerise/ds-logic/dist/Logic.types';
import { MatchingProps, MatchingTexts } from '@synerise/ds-logic/dist/Matching/Matching.types';
import { StepCardProps, StepCardTexts } from '@synerise/ds-step-card/dist/StepCard.types';

export type Expression =
  | {
      type: 'LOGIC';
      id: string;
      data: Partial<LogicProps>;
    }
  | {
      type: 'STEP';
      id: string;
      data: Partial<StepCardProps>;
      logic?: {
        type: 'LOGIC';
        id: string;
        data: Partial<LogicProps>;
      };
    };

export type FilterProps = {
  expressions: Expression[];
  matching?: MatchingProps;
  onChangeOrder: (newOrder: Expression[]) => void;
  onChangeLogic: (id: string, logic: LogicOperatorValue) => void;
  onChangeStepMatching: (id: string, matching: boolean) => void;
  onChangeStepName: (id: string, name: string) => void;
  onDeleteStep: (id: string) => void;
  onDuplicateStep: (id: string) => void;
  renderStepFooter: (expression: Expression) => React.ReactNode;
  renderStepContent: (expression: Expression) => React.ReactNode;
  addStep?: () => void;
  texts?: {
    matching: MatchingTexts;
    step: StepCardTexts;
    addFilter: string;
    dropMeHere: string;
  };
};
