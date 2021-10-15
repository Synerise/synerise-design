import Factors from '@synerise/ds-factors';
import Operators from '@synerise/ds-operators';
import Tooltip from '@synerise/ds-tooltip';
import Icon from '@synerise/ds-icon';
import { CloseS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as React from 'react';
import { FACTOR, OPERATOR, PARAMETER } from '../../Condition';
import * as S from '../../Condition.style';
import * as T from './ConditionRow.types';

// eslint-disable-next-line import/prefer-default-export
export const ConditionRow: React.FC<T.ConditionRowProps> = ({
  index,
  conditionId,
  conditionParameter,
  conditionOperator,
  conditionFactor,
  removeCondition,
  minConditionLength,
  maxConditionLength,
  conditionsNumber,
  stepId,
  currentStepId,
  currentConditionId,
  currentField,
  selectParameter,
  selectOperator,
  setStepConditionFactorType,
  setStepConditionFactorValue,
  texts,
}) => {
  return (
    <S.ConditionRow key={`condition-row-${conditionId}`} index={index}>
      <S.ConditionConnections
        first={index === 0}
        last={Boolean(
          index + 1 === conditionsNumber && maxConditionLength !== undefined && conditionsNumber === maxConditionLength
        )}
      />
      <S.ConditionWrapper>
        {conditionParameter && (
          <Factors
            {...conditionParameter}
            onChangeValue={(value): void => selectParameter(stepId, conditionId, value)}
            opened={stepId === currentStepId && conditionId === currentConditionId && currentField === PARAMETER}
          />
        )}
      </S.ConditionWrapper>
      {(!conditionParameter || conditionParameter?.value) && conditionOperator && (
        <S.ConditionWrapper>
          <Operators
            {...conditionOperator}
            onChange={(value): void => selectOperator(stepId, conditionId, value)}
            opened={stepId === currentStepId && conditionId === currentConditionId && currentField === OPERATOR}
          />
        </S.ConditionWrapper>
      )}
      {conditionOperator?.value && (
        <S.ConditionWrapper>
          {conditionFactor && (
            <Factors
              {...conditionFactor}
              setSelectedFactorType={(factorType): void => setStepConditionFactorType(stepId, conditionId, factorType)}
              onChangeValue={(value): void => setStepConditionFactorValue(stepId, conditionId, value)}
              factorKey={conditionId}
              opened={stepId === currentStepId && conditionId === currentConditionId && currentField === FACTOR}
            />
          )}
        </S.ConditionWrapper>
      )}
      {removeCondition && conditionsNumber > minConditionLength && (
        <S.RemoveIconWrapper
          onClick={(): void => removeCondition(stepId, conditionId)}
          className="ds-conditions-remove-row"
        >
          <Tooltip title={texts.removeConditionRowTooltip} trigger={['hover']}>
            <Icon component={<CloseS />} color={theme.palette['red-600']} />
          </Tooltip>
        </S.RemoveIconWrapper>
      )}
    </S.ConditionRow>
  );
};
