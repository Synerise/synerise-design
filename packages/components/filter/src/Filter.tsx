import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ReactSortable } from 'react-sortablejs';
import Logic from '@synerise/ds-logic';
import Matching from '@synerise/ds-logic/dist/Matching/Matching';
import Placeholder from '@synerise/ds-logic/dist/Placeholder/Placeholder';
import StepCard from '@synerise/ds-step-card';
import { LogicOperatorValue } from '@synerise/ds-logic/dist/Logic.types';
import { usePrevious } from '@synerise/ds-utils';

import * as S from './Filter.styles';
import { Expression, FilterProps } from './Filter.types';

const SORTABLE_CONFIG = {
  ghostClass: 'ghost-element',
  className: 'sortable-list',
  handle: '.step-card-drag-handler',
  animation: 200,
  forceFallback: true,
  filter: '.ds-matching-toggle, .step-card-right-side',
};

const component = {
  LOGIC: Logic,
  STEP: StepCard,
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
}: FilterProps) => {
  const previousExpressions = usePrevious(expressions);
  const [activeExpressionId, setActiveExpressionId] = useState<string | null>(null);

  useEffect(() => {
    if (previousExpressions && expressions.length > previousExpressions.length) {
      setActiveExpressionId(expressions[expressions.length - 1].id);
    }
  }, [expressions, previousExpressions]);

  const { formatMessage } = useIntl();
  const text = useMemo(
    () => ({
      addFilter: formatMessage({ id: 'DS.FILTER.ADD-FILTER' }),
      dropMeHere: formatMessage({ id: 'DS.FILTER.DROP-ME-HERE' }),
      conditionsLimit: formatMessage({ id: 'DS.FILTER.CONDITIONS-LIMIT' }),
      ...texts,
      matching: {
        matching: formatMessage({ id: 'DS.MATCHING.MATCHING' }),
        notMatching: formatMessage({ id: 'DS.MATCHING.NOT-MATCHING' }),
        ...texts?.matching,
      },
      step: {
        matching: formatMessage({ id: 'DS.MATCHING.MATCHING' }),
        notMatching: formatMessage({ id: 'DS.MATCHING.NOT-MATCHING' }),
        have: formatMessage({ id: 'DS.MATCHING.HAVE', defaultMessage: 'Have' }),
        performed: formatMessage({ id: 'DS.MATCHING.PERFORMED', defaultMessage: 'Performed' }),
        notHave: formatMessage({ id: 'DS.MATCHING.NOT-HAVE', defaultMessage: 'Does not have' }),
        notPerformed: formatMessage({ id: 'DS.MATCHING.NOT-PERFORMED', defaultMessage: 'Have not performed' }),
        attribute: formatMessage({ id: 'DS.MATCHING.EXPRESSION-TYPE.ATTRIBUTE', defaultMessage: 'attribute' }),
        event: formatMessage({ id: 'DS.MATCHING.EXPRESSION-TYPE.EVENT', defaultMessage: 'event' }),
        notAttribute: formatMessage({ id: 'DS.MATCHING.EXPRESSION-TYPE.NOT_ATTRIBUTE', defaultMessage: 'attribute' }),
        notEvent: formatMessage({ id: 'DS.MATCHING.EXPRESSION-TYPE.NOT_EVENT', defaultMessage: 'event' }),
        namePlaceholder: formatMessage({ id: 'DS.STEP-CARD.NAME-PLACEHOLDER' }),
        moveTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE' }),
        deleteTooltip: formatMessage({ id: 'DS.STEP-CARD.DELETE' }),
        duplicateTooltip: formatMessage({ id: 'DS.STEP-CARD.DUPLICATE' }),
        ...texts?.step,
      },
      placeholder: {
        chooseCondition: formatMessage({ id: 'DS.PLACEHOLDER.CHOOSE-CONDITION' }),
        getPreview: formatMessage({ id: 'DS.PLACEHOLDER.GET-PREVIEW' }),
        ...texts?.placeholder,
      },
    }),
    [formatMessage, texts]
  );

  const getContextTypeTexts = useCallback(
    expression => {
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
    expression => {
      return expression.id === activeExpressionId;
    },
    [activeExpressionId]
  );

  const isLimitExceeded = useMemo(
    () => (maxConditionsLimit ? expressions.length >= maxConditionsLimit : false),
    [expressions, maxConditionsLimit]
  );

  const componentProps = useCallback(
    (expression: Expression, index: number) => {
      const contextTypeTexts = getContextTypeTexts(expression);

      const props = {
        LOGIC: {
          onChange: (value: LogicOperatorValue): void => onChangeLogic(expression.id, value),
          options: logicOptions,
        },
        STEP: {
          onChangeMatching: (value: boolean): void => onChangeStepMatching(expression.id, value),
          onChangeName: (value: string): void => onChangeStepName(expression.id, value),
          onDelete: (): void => onDeleteStep(expression.id),
          onDuplicate: !isLimitExceeded ? (): void => onDuplicateStep(expression.id) : undefined,
          footer: renderStepFooter && renderStepFooter(expression),
          children: renderStepContent && renderStepContent(expression, !!activeExpressionId && !isActive(expression)),
          isHeaderVisible: visibilityConfig.isStepCardHeaderVisible,
          headerRightSide: renderStepHeaderRightSide && renderStepHeaderRightSide(expression, index),
          texts: {
            ...text.step,
            ...contextTypeTexts,
          },
        },
      };
      return props[expression.type];
    },
    [
      activeExpressionId,
      getContextTypeTexts,
      isActive,
      isLimitExceeded,
      logicOptions,
      onChangeLogic,
      onChangeStepMatching,
      onChangeStepName,
      onDeleteStep,
      onDuplicateStep,
      renderStepContent,
      renderStepFooter,
      renderStepHeaderRightSide,
      text.step,
      visibilityConfig.isStepCardHeaderVisible,
    ]
  );

  const renderExpression = useCallback(
    (expression, index) => {
      const Component = component[expression.type];
      const LogicComponent = expression.logic && component[expression.logic.type];
      return (
        <S.ExpressionWrapper
          key={expression.id}
          data-dropLabel={text.dropMeHere}
          index={index}
          style={!readOnly && isActive(expression) ? { zIndex: 10001 } : undefined}
          onMouseDown={(): void => setActiveExpressionId(expression.id)}
        >
          <Component {...expression.data} {...componentProps(expression, index)} readOnly={readOnly} />
          {expression.logic && index + 1 < expressions.length && (
            <S.LogicWrapper>
              <LogicComponent
                {...expression.logic.data}
                {...componentProps(expression.logic, index)}
                readOnly={readOnly}
              />
            </S.LogicWrapper>
          )}
        </S.ExpressionWrapper>
      );
    },
    [text.dropMeHere, isActive, componentProps, expressions.length, readOnly]
  );

  return (
    <S.FilterWrapper>
      <S.FilterHeader>
        {texts?.overwritten?.filterTitle ? (
          <S.FilterTitle>{texts.overwritten.filterTitle}</S.FilterTitle>
        ) : (
          <S.MatchingWrapper>
            <div>{matching && <Matching {...matching} texts={text.matching} readOnly={readOnly} />}</div>
            {!!maxConditionsLimit && (
              <S.ConditionsLimit>
                {text.conditionsLimit}:{' '}
                <S.ConditionsLimitResults>
                  {expressions.length}/{maxConditionsLimit}
                </S.ConditionsLimitResults>
              </S.ConditionsLimit>
            )}
          </S.MatchingWrapper>
        )}

        {renderHeaderRightSide && (
          <S.FilterHeaderRightSide>{renderHeaderRightSide(expressions)}</S.FilterHeaderRightSide>
        )}
      </S.FilterHeader>

      <>
        {expressions.length > 0 ? (
          <ReactSortable {...SORTABLE_CONFIG} list={expressions} setList={onChangeOrder}>
            {expressions.map(renderExpression)}
          </ReactSortable>
        ) : (
          <Placeholder text={text.placeholder.chooseCondition} />
        )}
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
