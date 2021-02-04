import * as React from 'react';
import { ReactSortable } from 'react-sortablejs-typescript';
import Logic from '@synerise/ds-logic';
import Matching from '@synerise/ds-logic/dist/Matching/Matching';
import StepCard from '@synerise/ds-step-card';
import { LogicOperatorValue } from '@synerise/ds-logic/dist/Logic.types';
import Button from '@synerise/ds-button';
import { Add3M } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { useIntl } from 'react-intl';
import * as S from './Filter.styles';
import { Expression, FilterProps } from './Filter.types';

const SORTABLE_CONFIG = {
  ghostClass: 'ghost-element',
  className: 'sortable-list',
  handle: '.step-card-drag-handler',
  animation: 150,
  forceFallback: true,
};

const component = {
  LOGIC: Logic,
  STEP: StepCard,
};

const Filter: React.FC<FilterProps> = ({
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
  onAdd,
  texts,
}) => {
  const { formatMessage } = useIntl();
  const text = React.useMemo(
    () => ({
      addFilter: formatMessage({ id: 'DS.FILTER.ADD-FILTER' }),
      dropMeHere: formatMessage({ id: 'DS.FILTER.DROP-ME-HERE' }),
      ...texts,
      matching: {
        matching: formatMessage({ id: 'DS.MATCHING.MATCHING' }),
        notMatching: formatMessage({ id: 'DS.MATCHING.NOT-MATCHING' }),
        ...texts?.matching,
      },
      step: {
        matching: formatMessage({ id: 'DS.MATCHING.MATCHING' }),
        notMatching: formatMessage({ id: 'DS.MATCHING.NOT-MATCHING' }),
        namePlaceholder: formatMessage({ id: 'DS.STEP-CARD.NAME-PLACEHOLDER' }),
        moveTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE' }),
        deleteTooltip: formatMessage({ id: 'DS.STEP-CARD.DELETE' }),
        duplicateTooltip: formatMessage({ id: 'DS.STEP-CARD.DUPLICATE' }),
        ...texts?.step,
      },
    }),
    [formatMessage, texts]
  );
  const componentProps = React.useCallback(
    (expression: Expression) => {
      const props = {
        LOGIC: {
          onChange: (value: LogicOperatorValue): void => onChangeLogic(expression.id, value),
        },
        STEP: {
          onChangeMatching: (value: boolean): void => onChangeStepMatching(expression.id, value),
          onChangeName: (value: string): void => onChangeStepName(expression.id, value),
          onDelete: (): void => onDeleteStep(expression.id),
          onDuplicate: (): void => onDuplicateStep(expression.id),
          footer: renderStepFooter && renderStepFooter(expression),
          children: renderStepContent && renderStepContent(expression),
          texts: text.step,
        },
      };
      return props[expression.type];
    },
    [
      onChangeLogic,
      onChangeStepMatching,
      onChangeStepName,
      onDeleteStep,
      onDuplicateStep,
      renderStepContent,
      renderStepFooter,
      text,
    ]
  );

  const renderExpression = React.useCallback(
    (expression, index) => {
      const Component = component[expression.type];
      const LogicComponent = expression.logic && component[expression.logic.type];
      return (
        <S.ExpressionWrapper key={expression.id} data-dropLabel={text.dropMeHere}>
          <Component {...expression.data} {...componentProps(expression)} />
          {expression.logic && index + 1 < expressions.length && (
            <S.LogicWrapper>
              <LogicComponent {...expression.logic.data} {...componentProps(expression.logic)} />
            </S.LogicWrapper>
          )}
        </S.ExpressionWrapper>
      );
    },
    [componentProps, expressions.length, text]
  );

  return (
    <S.FilterWrapper>
      {matching && <Matching {...matching} texts={text.matching} />}
      <ReactSortable {...SORTABLE_CONFIG} list={expressions} setList={onChangeOrder}>
        {expressions.map(renderExpression)}
      </ReactSortable>
      {onAdd && (
        <S.AddButtonWrapper>
          <Button type="primary" mode="icon-label" onClick={onAdd}>
            <Icon component={<Add3M />} />
            {text.addFilter}
          </Button>
        </S.AddButtonWrapper>
      )}
    </S.FilterWrapper>
  );
};
export default Filter;
