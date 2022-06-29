import * as React from 'react';
import Logic from '@synerise/ds-logic';
import StepCard from '@synerise/ds-step-card';
import { SortableElement } from 'react-sortable-hoc';
import * as S from '../Filter.styles';
import { Expression, FilterProps, StepType, LogicType } from '../Filter.types';

const component = {
  LOGIC: Logic,
  STEP: StepCard,
};

export interface SortableItemProps {
  expression: Expression;
  index: number;
  isActive: (id: Expression) => boolean;
  setActiveExpressionId: (id: string | null) => void;
  componentProps: (type: StepType | LogicType) => {};
  text: FilterProps['texts'];
  expressionsCount: number;
}

// eslint-disable-next-line import/prefer-default-export
export const SortableItem = SortableElement(
  ({
    expression,
    index,
    setActiveExpressionId,
    text,
    expressionsCount,
    isActive,
    componentProps,
  }: SortableItemProps) => {
    const Component = component[expression.type];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const LogicComponent = (expression as StepType).logic !== undefined && component[expression.logic.type];
    return (
      <S.ExpressionWrapper
        key={expression.id}
        data-dropLabel={text?.dropMeHere}
        index={index}
        style={isActive(expression) ? { zIndex: 10001 } : undefined}
        onClick={(): void => setActiveExpressionId(expression.id)}
      >
        {/* @ts-ignore */}
        <Component {...expression.data} {...componentProps(expression)} />
        {(expression as StepType).logic && index + 1 < expressionsCount && (
          <S.LogicWrapper>
            {/* @ts-ignore */}
            <LogicComponent {...expression.logic.data} {...componentProps(expression.logic)} />
          </S.LogicWrapper>
        )}
      </S.ExpressionWrapper>
    );
  }
);
