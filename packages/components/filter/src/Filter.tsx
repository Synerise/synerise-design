import React, { useCallback, useMemo, useEffect, useState, useRef, TransitionEvent } from 'react';
import { useIntl } from 'react-intl';
import Sortable from '@synerise/ds-sortable';
import { Matching, Placeholder } from '@synerise/ds-logic';
import type { LogicOperatorValue, LogicProps } from '@synerise/ds-logic';
import { StepCardProps } from '@synerise/ds-step-card';
import { NOOP, usePrevious } from '@synerise/ds-utils';

import * as S from './Filter.styles';
import { Expression, FilterProps, LogicType, StepType } from './Filter.types';

import { ExpressionItem, DraggableExpressionItem } from './components/ExpressionItem';
import type { ExpressionItemProps } from './components/ExpressionItem';
import { isStepType } from './utils';

const TRANSITION_DURATION = 0.5;
const TRANSITION_DURATION_MAX = 1.5;
const TOP_TRANSITION_ZINDEX = 1003;
const BOTTOM_TRANSITION_ZINDEX = 1002;

const rearrangeItems = (sourceArray: Expression[], oldIndex: number, newIndex: number) => {
  sourceArray.splice(newIndex, 0, sourceArray.splice(oldIndex, 1)[0]);
  return [...sourceArray];
};

const Filter = ({
  maxConditionsLimit,
  expressions,
  matching,
  onChangeOrder,
  onChangeLogic,
  onChangeStepMatching,
  onChangeStepName,
  onDeleteStep,
  onDuplicateStep,
  renderStepFooter,
  renderStepContent,
  renderStepHeaderRightSide,
  addFilterComponent,
  texts,
  logicOptions,
  renderHeaderRightSide,
  visibilityConfig = { isStepCardHeaderVisible: true },
  readOnly = false,
  singleStepCondition = false,
  getMoveByLabel,
}: FilterProps) => {
  const previousExpressions = usePrevious(expressions);
  const [activeExpressionId, setActiveExpressionId] = useState<string | null>(null);
  const expressionRefs = useRef({});
  const movedExpressionId = useRef<string | null>(null);

  useEffect(() => {
    if (movedExpressionId.current && previousExpressions?.length) {
      const oldIndex = previousExpressions?.findIndex((expression: Expression) => {
        return expression.id === movedExpressionId.current;
      });
      const newIndex = expressions?.findIndex((expression: Expression) => {
        return expression.id === movedExpressionId.current;
      });
      if (oldIndex !== undefined && oldIndex !== newIndex) {
        const sign = oldIndex < newIndex ? 1 : -1;
        const low = Math.min(oldIndex, newIndex);
        const high = Math.max(oldIndex, newIndex);

        const movedExpressionHeight =
          sign * expressionRefs.current[movedExpressionId.current].getBoundingClientRect().height;
        let expressionOffset = 0;
        const movedCardTransformDuration = Math.min((high - low) * TRANSITION_DURATION, TRANSITION_DURATION_MAX);
        expressions.forEach((expression: Expression, index: number) => {
          if (expression.id !== movedExpressionId.current && index >= low && index <= high) {
            expressionOffset += expressionRefs.current[expression.id].getBoundingClientRect().height;
            expressionRefs.current[expression.id].style.transition = '';
            expressionRefs.current[expression.id].style.zIndex = BOTTOM_TRANSITION_ZINDEX;
            expressionRefs.current[expression.id].style.transform = `translateY(${movedExpressionHeight}px)`;
          }
        });
        expressionRefs.current[movedExpressionId.current].style.transition = '';
        expressionRefs.current[movedExpressionId.current].style.zIndex = TOP_TRANSITION_ZINDEX;
        expressionRefs.current[movedExpressionId.current].style.transform = `translateY(${-sign * expressionOffset}px)`;

        requestAnimationFrame(() => {
          expressions.forEach((expression: Expression) => {
            expressionRefs.current[expression.id].style.transition = `transform ${
              expression.id === movedExpressionId.current ? movedCardTransformDuration : TRANSITION_DURATION
            }s`;
            expressionRefs.current[expression.id].style.transform = '';
          });
          movedExpressionId.current = null;
        });
      }
    }
  });

  useEffect(() => {
    if (previousExpressions && expressions.length > previousExpressions.length) {
      setActiveExpressionId(expressions[expressions.length - 1].id);
    }
  }, [expressions, previousExpressions]);

  const { formatMessage } = useIntl();
  const text = useMemo(
    () => ({
      addFilter: formatMessage({ id: 'DS.FILTER.ADD-FILTER', defaultMessage: 'Add filter' }),
      dropMeHere: formatMessage({ id: 'DS.FILTER.DROP-ME-HERE', defaultMessage: 'Drop me here' }),
      conditionsLimit: formatMessage({ id: 'DS.FILTER.CONDITIONS-LIMIT', defaultMessage: '' }),
      ...texts,
      matching: {
        matching: formatMessage({ id: 'DS.MATCHING.MATCHING', defaultMessage: 'Matching' }),
        notMatching: formatMessage({ id: 'DS.MATCHING.NOT-MATCHING', defaultMessage: 'Not matching' }),
        ...texts?.matching,
      },
      step: {
        matching: formatMessage({ id: 'DS.MATCHING.MATCHING', defaultMessage: 'Matching' }),
        notMatching: formatMessage({ id: 'DS.MATCHING.NOT-MATCHING', defaultMessage: 'Not matching' }),
        have: formatMessage({ id: 'DS.MATCHING.HAVE', defaultMessage: 'Have' }),
        performed: formatMessage({ id: 'DS.MATCHING.PERFORMED', defaultMessage: 'Performed' }),
        notHave: formatMessage({ id: 'DS.MATCHING.NOT-HAVE', defaultMessage: 'Does not have' }),
        notPerformed: formatMessage({ id: 'DS.MATCHING.NOT-PERFORMED', defaultMessage: 'Have not performed' }),
        attribute: formatMessage({ id: 'DS.MATCHING.EXPRESSION-TYPE.ATTRIBUTE', defaultMessage: 'attribute' }),
        event: formatMessage({ id: 'DS.MATCHING.EXPRESSION-TYPE.EVENT', defaultMessage: 'event' }),
        notAttribute: formatMessage({ id: 'DS.MATCHING.EXPRESSION-TYPE.NOT_ATTRIBUTE', defaultMessage: 'attribute' }),
        notEvent: formatMessage({ id: 'DS.MATCHING.EXPRESSION-TYPE.NOT_EVENT', defaultMessage: 'event' }),
        namePlaceholder: formatMessage({ id: 'DS.STEP-CARD.NAME-PLACEHOLDER' }),
        moveTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE', defaultMessage: 'Move' }),
        moveUpTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE-UP', defaultMessage: 'Move up' }),
        moveDownTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE-DOWN', defaultMessage: 'Move down' }),
        deleteTooltip: formatMessage({ id: 'DS.STEP-CARD.DELETE', defaultMessage: 'Delete' }),
        duplicateTooltip: formatMessage({ id: 'DS.STEP-CARD.DUPLICATE', defaultMessage: 'Duplicate' }),
        ...texts?.step,
      },
      placeholder: {
        chooseCondition: formatMessage({ id: 'DS.PLACEHOLDER.CHOOSE-CONDITION' }),
        ...texts?.placeholder,
      },
    }),
    [formatMessage, texts]
  );

  const getContextTypeTexts = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (expression: any) => {
      const contextType = expression.expressionType;
      return {
        matching: contextType === 'attribute' ? text.step.have : text.step.performed,
        notMatching: contextType === 'attribute' ? text.step.notHave : text.step.notPerformed,
        conditionType: contextType === 'attribute' ? text.step.attribute : text.step.event,
        notConditionType: contextType === 'attribute' ? text.step.notAttribute : text.step.notEvent,
      };
    },
    [text]
  );

  const isActive = useCallback(
    (expression: Expression) => {
      return expression.id === activeExpressionId;
    },
    [activeExpressionId]
  );

  const isLimitExceeded = useMemo(
    () => (maxConditionsLimit ? expressions.length >= maxConditionsLimit : false),
    [expressions, maxConditionsLimit]
  );

  const stepExpressionCount = useMemo(() => {
    return expressions.filter(expression => expression.type === 'STEP').length;
  }, [expressions]);

  const handleTransitionEnd = useCallback((event: TransitionEvent) => {
    if (event.currentTarget && event.currentTarget instanceof HTMLElement) {
      event.currentTarget.style.removeProperty('z-index');
    }
  }, []);

  const handleMove = useCallback(
    (index: number, offset: number) => {
      const newIndex = index + offset;
      const newOrder = rearrangeItems([...expressions], index, newIndex);
      movedExpressionId.current = newOrder[newIndex].id;
      onChangeOrder?.(newOrder);
    },
    [expressions, onChangeOrder]
  );

  const isDraggable = Boolean(onChangeOrder && expressions.length > 1);

  const getStepProps = useCallback(
    (expression: StepType, index: number): Omit<StepCardProps, 'matching' | 'name'> => {
      const contextTypeTexts = getContextTypeTexts(expression);
      const reorderProps = {
        expressionIndex: index,
        expressionMoved: movedExpressionId.current === expression.id,
        expressionCount: stepExpressionCount,
        onMove: handleMove,
      };

      return {
        ...reorderProps,
        onChangeMatching: onChangeStepMatching
          ? (value: boolean) => onChangeStepMatching(expression.id, value)
          : undefined,
        onChangeName: onChangeStepName ? (value: string) => onChangeStepName(expression.id, value) : undefined,
        onDelete: onDeleteStep ? () => onDeleteStep(expression.id) : undefined,
        onDuplicate: onDuplicateStep && !isLimitExceeded ? () => onDuplicateStep(expression.id) : undefined,
        footer: renderStepFooter && renderStepFooter(expression),
        children: renderStepContent && renderStepContent(expression, !!activeExpressionId && !isActive(expression)),
        isHeaderVisible: visibilityConfig.isStepCardHeaderVisible,
        renderHeaderRightSide: renderStepHeaderRightSide
          ? (itemIndex: number, options?: { placeholder?: boolean }) =>
              renderStepHeaderRightSide(expression, itemIndex, options)
          : undefined,
        isDraggable,
        singleStepCondition: Boolean(singleStepCondition),
        additionalFields: (expression as StepType).data.additionalFields,
        getMoveByLabel,
        dropLabel: text.dropMeHere,
        texts: {
          ...text.step,
          ...contextTypeTexts,
        },
      };
    },
    [
      getContextTypeTexts,
      stepExpressionCount,
      handleMove,
      onChangeStepMatching,
      onChangeStepName,
      onDeleteStep,
      onDuplicateStep,
      isLimitExceeded,
      renderStepFooter,
      renderStepContent,
      activeExpressionId,
      isActive,
      visibilityConfig.isStepCardHeaderVisible,
      renderStepHeaderRightSide,
      isDraggable,
      singleStepCondition,
      getMoveByLabel,
      text.dropMeHere,
      text.step,
    ]
  );

  const getLogicProps = useCallback(
    (expression: LogicType): LogicProps => {
      return {
        value: '',
        onChange: onChangeLogic ? (value: LogicOperatorValue) => onChangeLogic(expression.id, value) : NOOP,
        options: logicOptions,
      };
    },
    [onChangeLogic, logicOptions]
  );

  const expressionData = useMemo((): ExpressionItemProps[] => {
    const expressionsOrder = expressions.map(expression => expression.id);
    return expressions.map((expression, index) => {
      const logicProps: LogicProps =
        isStepType(expression) && expression.logic ? getLogicProps(expression.logic) : { value: '', onChange: NOOP };
      const stepProps = isStepType(expression) ? getStepProps(expression, index) : {};

      return {
        wrapperRef: (element: HTMLDivElement) => (expressionRefs.current[expression.id] = element),
        dropLabel: text.dropMeHere,
        logicProps,
        stepProps,
        handleMouseDown: () => setActiveExpressionId(expression.id),
        handleTransitionEnd,
        expression,
        expressionsOrder,
        id: expression.id,
        expressionIndex: index,
        readOnly,
        isLast: index === expressions.length - 1,
      };
    });
  }, [expressions, readOnly, handleTransitionEnd, setActiveExpressionId, getStepProps, getLogicProps, text.dropMeHere]);

  const handleChangeOrder = useCallback(
    (newOrder: ExpressionItemProps[]) => {
      if (onChangeOrder) {
        const idOrder = newOrder.map(item => item.id);
        const updatedExpressions = [...expressions].sort(
          (a: Expression, b: Expression) => idOrder.indexOf(a.id) - idOrder.indexOf(b.id)
        );
        onChangeOrder(updatedExpressions);
      }
    },
    [onChangeOrder, expressions]
  );

  const renderExpressions = useCallback(() => {
    if (isDraggable) {
      return (
        <Sortable
          placeholderCss={S.placeholderCss}
          axis="y"
          items={expressionData}
          ItemComponent={DraggableExpressionItem}
          onOrderChange={handleChangeOrder}
        />
      );
    }
    return expressionData.map(ExpressionItem);
  }, [expressionData, handleChangeOrder, isDraggable]);

  return (
    <S.FilterWrapper>
      <S.FilterHeader>
        {texts?.overwritten?.filterTitle ? (
          <S.FilterTitle>{texts.overwritten.filterTitle}</S.FilterTitle>
        ) : (
          <S.MatchingAndConditionsWrapper>
            <S.MatchingWrapper>
              {matching && <Matching {...matching} texts={text.matching} readOnly={readOnly} />}
            </S.MatchingWrapper>
            {!!maxConditionsLimit && (
              <S.ConditionsLimit>
                {text.conditionsLimit}:{' '}
                <S.ConditionsLimitResults>
                  {expressions.length}/{maxConditionsLimit}
                </S.ConditionsLimitResults>
              </S.ConditionsLimit>
            )}
          </S.MatchingAndConditionsWrapper>
        )}

        {renderHeaderRightSide && (
          <S.FilterHeaderRightSide>{renderHeaderRightSide(expressions)}</S.FilterHeaderRightSide>
        )}
      </S.FilterHeader>

      <>
        {expressions.length > 0 ? renderExpressions() : <Placeholder text={text.placeholder.chooseCondition} />}
        {addFilterComponent && !readOnly && (
          <S.AddButtonWrapper>
            {typeof addFilterComponent === 'function' ? addFilterComponent({ isLimitExceeded }) : addFilterComponent}
          </S.AddButtonWrapper>
        )}
      </>
    </S.FilterWrapper>
  );
};
export default Filter;
