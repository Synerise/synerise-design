import React from 'react';

import Logic from '@synerise/ds-logic';
import StepCard from '@synerise/ds-step-card';

import * as S from '../../Filter.styles';
import { isStepType } from '../../utils';
import type { ExpressionItemProps } from './ExpressionItem.types';

export const ExpressionItem = ({
  handleTransitionEnd,
  dragHandleProps,
  isDragged,
  isDragOverlay,
  expression,
  readOnly,
  handleMouseDown,
  isLast,
  stepProps,
  logicProps,
  wrapperRef,
  expressionIndex,
  dragIndex,
  expressionsOrder,
}: ExpressionItemProps) => {
  const { data, id } = expression;
  const shouldRenderLogic =
    isStepType(expression) &&
    expression.logic &&
    !isLast &&
    !isDragged &&
    !isDragOverlay &&
    expressionIndex !== -1;
  return (
    <S.ExpressionWrapper
      data-testid="condition-step"
      onTransitionEnd={handleTransitionEnd}
      ref={wrapperRef}
      key={id}
      onMouseDown={handleMouseDown}
    >
      {/* @ts-expect-error Types of property 'matching' are incompatible. */}
      <StepCard
        expressionIndex={expressionIndex}
        expressionCount={expressionsOrder.length}
        {...data}
        {...stepProps}
        readOnly={readOnly}
        dragHandleProps={dragHandleProps}
        isDragged={isDragged}
        isDragOverlay={isDragOverlay}
        dragIndex={dragIndex}
      />
      {shouldRenderLogic && (
        <S.LogicWrapper data-testid="condition-logic">
          {/* @ts-expect-error Types of property 'value' are incompatible. */}
          <Logic
            {...logicProps}
            {...expression.logic?.data}
            readOnly={readOnly}
          />
        </S.LogicWrapper>
      )}
    </S.ExpressionWrapper>
  );
};
