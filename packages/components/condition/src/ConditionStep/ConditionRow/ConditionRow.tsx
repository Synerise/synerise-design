import React, { type ReactNode, useMemo } from 'react';

import { theme } from '@synerise/ds-core';
import Factors, { type ParameterValueType } from '@synerise/ds-factors';
import Icon, { CloseS } from '@synerise/ds-icon';
import Operators from '@synerise/ds-operators';
import Tooltip from '@synerise/ds-tooltip';
import { getPopupContainer } from '@synerise/ds-utils';

import * as S from '../../Condition.style';
import { FACTOR, OPERATOR, PARAMETER } from '../../constants';
import type * as T from './ConditionRow.types';

export const ConditionRow = ({
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
  onDeactivate,
  inputProps,
  readOnly = false,
  parameterSelectorComponent,
  factorParameterSelectorComponent,
  factorValueExtraProps,
}: T.ConditionRowProps) => {
  const conditionFactorErrorText = conditionFactor?.errorText;
  const conditionParameterErrorText = conditionParameter?.errorText;
  const conditionOperatorErrorText = conditionOperator?.errorText;

  const rowHasError = !!(
    conditionParameterErrorText ||
    conditionOperatorErrorText ||
    conditionFactorErrorText
  );

  const conditionErrorMessage = useMemo(() => {
    let errorText: ReactNode | string;
    if (conditionParameterErrorText) {
      errorText = conditionParameterErrorText;
    } else if (conditionOperatorErrorText) {
      errorText = conditionOperatorErrorText;
    } else if (conditionFactorErrorText) {
      errorText = conditionFactorErrorText;
    }
    return errorText ? <S.ErrorWrapper>{errorText}</S.ErrorWrapper> : <></>;
  }, [
    conditionOperatorErrorText,
    conditionFactorErrorText,
    conditionParameterErrorText,
  ]);

  const removeConditionTrigger = !readOnly &&
    removeCondition &&
    conditionsNumber > minConditionLength && (
      <S.RemoveIconWrapper
        onClick={() => removeCondition(stepId, conditionId)}
        className="ds-conditions-remove-row"
      >
        <Tooltip title={texts.removeConditionRowTooltip} trigger={['hover']}>
          <Icon component={<CloseS />} color={theme.palette['red-600']} />
        </Tooltip>
      </S.RemoveIconWrapper>
    );

  const renderConditionParameterWrapper = Boolean(conditionParameter);
  const renderConditionOperatorWrapper = Boolean(
    (!conditionParameter ||
      (conditionParameter?.value &&
        (conditionParameter?.value as ParameterValueType).name !== '')) &&
      conditionOperator,
  );
  const renderConditionFactorWrapper = Boolean(
    conditionFactor !== undefined &&
      conditionOperator?.value &&
      conditionFactor?.availableFactorTypes !== null,
  );

  let lastConditionWrapper = '';
  if (renderConditionFactorWrapper) {
    lastConditionWrapper = 'factor';
  } else if (renderConditionOperatorWrapper) {
    lastConditionWrapper = 'operator';
  } else if (renderConditionParameterWrapper) {
    lastConditionWrapper = 'parameter';
  }

  const conditionFactorProps = useMemo(() => {
    return {
      ...conditionFactor,
      parameters: conditionFactor?.parameters && {
        ...conditionFactor.parameters,
        selectedButtonColored:
          conditionFactor.parameters?.selectedButtonColored === undefined
            ? true
            : conditionFactor.parameters?.selectedButtonColored,
      },
    };
  }, [conditionFactor]);

  return (
    <S.ConditionRow
      data-testid="condition-row"
      onlyChild={maxConditionLength === 1}
      style={hasPriority ? { zIndex: 1001 } : undefined}
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
                  conditionsNumber === maxConditionLength,
              )
        }
        readOnly={readOnly}
      />
      <S.ConditionRowLine>
        <S.ConditionRowDefinition>
          <S.ConditionWrapper
            data-testid="condition-parameter-wrapper"
            withRemoveTrigger={lastConditionWrapper === 'parameter'}
          >
            {renderConditionParameterWrapper && (
              <Factors
                selectedFactorType=""
                defaultFactorType=""
                value=""
                customFactorValueComponents={
                  parameterSelectorComponent && {
                    parameter: {
                      component: parameterSelectorComponent,
                    },
                    contextParameter: {
                      component: parameterSelectorComponent,
                    },
                  }
                }
                {...conditionParameter}
                inputProps={inputProps}
                getPopupContainerOverride={
                  getPopupContainerOverride || getPopupContainer
                }
                onActivate={() => onActivate && onActivate(PARAMETER)}
                onDeactivate={onDeactivate}
                onChangeValue={(value) =>
                  selectParameter(stepId, conditionId, value)
                }
                opened={
                  hasPriority &&
                  stepId === currentStepId &&
                  conditionId === currentConditionId &&
                  currentField === PARAMETER
                }
                readOnly={readOnly}
                error={Boolean(conditionParameter?.errorText)}
              />
            )}
            {lastConditionWrapper === 'parameter' && removeConditionTrigger}
          </S.ConditionWrapper>
          {renderConditionOperatorWrapper && (
            <S.ConditionWrapper
              data-testid="condition-operator-wrapper"
              withRemoveTrigger={lastConditionWrapper === 'operator'}
            >
              <Operators
                groups={[]}
                items={[]}
                {...conditionOperator}
                getPopupContainerOverride={
                  getPopupContainerOverride || getPopupContainer
                }
                onActivate={() => onActivate && onActivate(OPERATOR)}
                onDeactivate={onDeactivate}
                onChange={(value) => selectOperator(stepId, conditionId, value)}
                opened={
                  hasPriority &&
                  stepId === currentStepId &&
                  conditionId === currentConditionId &&
                  currentField === OPERATOR
                }
                readOnly={readOnly}
                errorText={conditionOperator?.errorText}
              />
              {lastConditionWrapper === 'operator' && removeConditionTrigger}
            </S.ConditionWrapper>
          )}
          {renderConditionFactorWrapper && (
            <S.ConditionWrapper
              data-testid="condition-factor-wrapper"
              withRemoveTrigger={lastConditionWrapper === 'factor'}
            >
              {conditionFactor?.withCustomFactor || (
                <Factors
                  selectedFactorType=""
                  defaultFactorType=""
                  value=""
                  customFactorValueComponents={
                    factorParameterSelectorComponent && {
                      parameter: {
                        component: factorParameterSelectorComponent,
                      },
                      contextParameter: {
                        component: factorParameterSelectorComponent,
                      },
                    }
                  }
                  factorValueExtraProps={factorValueExtraProps}
                  {...conditionFactorProps}
                  inputProps={inputProps}
                  getPopupContainerOverride={
                    getPopupContainerOverride || getPopupContainer
                  }
                  onActivate={() => onActivate && onActivate(FACTOR)}
                  onDeactivate={onDeactivate}
                  setSelectedFactorType={(factorType) =>
                    setStepConditionFactorType(stepId, conditionId, factorType)
                  }
                  onChangeValue={(value) =>
                    setStepConditionFactorValue(stepId, conditionId, value)
                  }
                  factorKey={conditionId}
                  error={Boolean(conditionFactorProps.errorText)}
                  opened={
                    hasPriority &&
                    stepId === currentStepId &&
                    conditionId === currentConditionId &&
                    currentField === FACTOR
                  }
                  readOnly={readOnly}
                />
              )}
              {lastConditionWrapper === 'factor' && removeConditionTrigger}
            </S.ConditionWrapper>
          )}
        </S.ConditionRowDefinition>
        {conditionErrorMessage}
      </S.ConditionRowLine>
    </S.ConditionRow>
  );
};
