import Factors from '@synerise/ds-factors';
import Operators from '@synerise/ds-operators';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { CloseS } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
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
  stepType,
  onDeactivate,
  // error,
  inputProps,
  readOnly = false,
}) => {
  const conditionFactorErrorText = conditionFactor?.errorText;
  const conditionParameterErrorText = conditionParameter?.errorText;
  const conditionOperatorErrorText = conditionOperator?.errorText;
  const conditionParameterValue = conditionParameter?.value;
  const rowHasError = !!(
    conditionParameterErrorText ||
    (conditionOperatorErrorText && conditionParameterValue) ||
    (conditionFactorErrorText && conditionParameterValue)
  );

  const conditionErrorMessage = React.useMemo(() => {
    let errorText: React.ReactNode | string;
    if (conditionParameterErrorText) {
      errorText = conditionParameterErrorText;
    } else if (conditionOperatorErrorText && conditionParameterValue) {
      errorText = conditionOperatorErrorText;
    } else if (conditionFactorErrorText && conditionParameterValue) {
      errorText = conditionFactorErrorText;
    }
    return errorText ? <S.ErrorWrapper>{errorText}</S.ErrorWrapper> : <></>;
  }, [conditionOperatorErrorText, conditionFactorErrorText, conditionParameterErrorText, conditionParameterValue]);

  return (
    <S.ConditionRow
      stepType={stepType}
      style={hasPriority ? { zIndex: 10001 } : undefined}
      key={`condition-row-${conditionId}`}
      index={index}
      withError={rowHasError}
    >
      <S.ConditionConnections
        first={index === 0}
        last={
          readOnly
            ? Boolean(index + 1 === conditionsNumber)
            : Boolean(
                addCondition &&
                  index + 1 === conditionsNumber &&
                  maxConditionLength !== undefined &&
                  conditionsNumber === maxConditionLength
              )
        }
        readOnly={readOnly}
      />
      <S.ConditionRowLine>
        <S.ConditionRowDefinition>
          <S.ConditionWrapper>
            {conditionParameter && (
              <Factors
                {...conditionParameter}
                inputProps={inputProps}
                getPopupContainerOverride={getPopupContainerOverride}
                onActivate={(): void => onActivate && onActivate(PARAMETER)}
                onDeactivate={onDeactivate}
                onChangeValue={(value): void => selectParameter(stepId, conditionId, value)}
                opened={
                  hasPriority &&
                  stepId === currentStepId &&
                  conditionId === currentConditionId &&
                  currentField === PARAMETER
                }
                readOnly={readOnly}
                error={Boolean(conditionParameter.errorText)}
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
                  onDeactivate={onDeactivate}
                  onChange={(value): void => selectOperator(stepId, conditionId, value)}
                  opened={
                    hasPriority &&
                    stepId === currentStepId &&
                    conditionId === currentConditionId &&
                    currentField === OPERATOR
                  }
                  readOnly={readOnly}
                  errorText={conditionOperator.errorText}
                />
              </S.ConditionWrapper>
            )}
          {conditionFactor !== undefined &&
            conditionOperator?.value &&
            conditionFactor?.availableFactorTypes !== null && (
              <S.ConditionWrapper fullWidth>
                {conditionFactor?.withCustomFactor || (
                  <Factors
                    {...conditionFactor}
                    inputProps={inputProps}
                    getPopupContainerOverride={getPopupContainerOverride}
                    onActivate={(): void => onActivate && onActivate(FACTOR)}
                    onDeactivate={onDeactivate}
                    setSelectedFactorType={(factorType): void =>
                      setStepConditionFactorType(stepId, conditionId, factorType)
                    }
                    onChangeValue={(value): void => setStepConditionFactorValue(stepId, conditionId, value)}
                    factorKey={conditionId}
                    error={Boolean(conditionFactor.errorText)}
                    opened={
                      hasPriority &&
                      stepId === currentStepId &&
                      conditionId === currentConditionId &&
                      currentField === FACTOR
                    }
                    readOnly={readOnly}
                  />
                )}
              </S.ConditionWrapper>
            )}
          {!readOnly && removeCondition && conditionsNumber > minConditionLength && (
            <S.RemoveIconWrapper
              onClick={(): void => removeCondition(stepId, conditionId)}
              className="ds-conditions-remove-row"
            >
              <Tooltip title={texts.removeConditionRowTooltip} trigger={['hover']}>
                <Icon component={<CloseS />} color={theme.palette['red-600']} />
              </Tooltip>
            </S.RemoveIconWrapper>
          )}
        </S.ConditionRowDefinition>
        {conditionErrorMessage}
      </S.ConditionRowLine>
    </S.ConditionRow>
  );
};
