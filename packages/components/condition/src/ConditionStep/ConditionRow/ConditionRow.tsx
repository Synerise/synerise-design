import Factors from '@synerise/ds-factors';
import Operators from '@synerise/ds-operators';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { CloseS } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as React from 'react';
import { ParameterValueType } from '@synerise/ds-factors/dist/Factors.types';
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
  addCondition,
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
  getPopupContainerOverride,
  onActivate,
  hasPriority,
  texts,
}) => {
  console.log('current Field', currentConditionId, currentStepId, currentField);

  return (
    <S.ConditionRow
      style={hasPriority ? { zIndex: 10001 } : undefined}
      key={`condition-row-${conditionId}`}
      index={index}
    >
      <S.ConditionConnections
        first={index === 0}
        last={Boolean(
          addCondition &&
            index + 1 === conditionsNumber &&
            maxConditionLength !== undefined &&
            conditionsNumber === maxConditionLength
        )}
      />
      <S.ConditionWrapper>
        {conditionParameter && (
          <Factors
            {...conditionParameter}
            getPopupContainerOverride={getPopupContainerOverride}
            onActivate={(): void => onActivate && onActivate(PARAMETER)}
            onChangeValue={(value): void => selectParameter(stepId, conditionId, value)}
            opened={
              hasPriority &&
              stepId === currentStepId &&
              conditionId === currentConditionId &&
              currentField === PARAMETER
            }
          />
        )}
      </S.ConditionWrapper>
      {(!conditionParameter ||
        (conditionParameter?.value && (conditionParameter?.value as ParameterValueType).name !== '')) &&
        conditionOperator && (
          <S.ConditionWrapper>
            <Operators
              {...conditionOperator}
              getPopupContainerOverride={getPopupContainerOverride}
              onActivate={(): void => onActivate && onActivate(OPERATOR)}
              onChange={(value): void => selectOperator(stepId, conditionId, value)}
              opened={
                hasPriority &&
                stepId === currentStepId &&
                conditionId === currentConditionId &&
                currentField === OPERATOR
              }
            />
          </S.ConditionWrapper>
        )}
      {conditionFactor !== undefined && conditionOperator?.value && conditionFactor?.availableFactorTypes !== null && (
        <S.ConditionWrapper fullWidth>
          <>
            {conditionFactor?.withCustomFactor || (
              <Factors
                {...conditionFactor}
                getPopupContainerOverride={getPopupContainerOverride}
                onActivate={(): void => onActivate && onActivate(FACTOR)}
                setSelectedFactorType={(factorType): void =>
                  setStepConditionFactorType(stepId, conditionId, factorType)
                }
                onChangeValue={(value): void => setStepConditionFactorValue(stepId, conditionId, value)}
                factorKey={conditionId}
                opened={
                  hasPriority &&
                  stepId === currentStepId &&
                  conditionId === currentConditionId &&
                  currentField === FACTOR
                }
              />
            )}
          </>
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
