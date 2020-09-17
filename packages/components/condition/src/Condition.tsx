import * as React from 'react';
import InlineEdit from '@synerise/ds-inline-edit';
import { Add2M, CloseS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
import { ChangeEvent } from 'react';
import Subject from '@synerise/ds-subject';
import Factors from '@synerise/ds-factors';
import Operators from '@synerise/ds-operators';
import { ConditionProps, ConditionStep, StepConditions } from './Condition.types';
import * as S from './Condition.style';

const Condition: React.FC<ConditionProps> = ({ steps, addCondition, removeCondition, updateStepName, texts }) => {
  const [currentConditionId, setCurrentConditionId] = React.useState<React.ReactText>('');
  const [currentField, setCurrentField] = React.useState<string>('');

  const clearConditionRow = React.useCallback(
    step => {
      if (removeCondition && addCondition) {
        step.conditions.forEach((condition: StepConditions, index: number) => {
          if (index > 0) {
            removeCondition(step.id, condition.id);
          }
        });
      }
      step.conditions.forEach((condition: StepConditions) => {
        condition.factor && condition.factor.onChangeValue(undefined);
        condition.operator && condition.operator.onChange(undefined);
        condition.parameter && condition.parameter.onChangeValue(undefined);
      });
    },
    [removeCondition, addCondition]
  );

  const selectSubject = React.useCallback(
    (value, step: ConditionStep): void => {
      step.subject.selectItem(value);
      clearConditionRow(step);
      setCurrentConditionId(step.conditions[0].id);
      if (step.conditions[0].parameter) {
        setCurrentField('parameter');
      } else if (step.conditions[0].operator) {
        setCurrentField('operator');
      }
    },
    [clearConditionRow]
  );

  const selectParameter = React.useCallback((condition: StepConditions, value): void => {
    if (condition.id && condition.parameter) {
      condition.parameter.onChangeValue(value);
      condition.operator && condition.operator.onChange(undefined);
      condition.factor && condition.factor.onChangeValue(undefined);
      setCurrentConditionId(condition.id);
      setCurrentField('operator');
    }
  }, []);

  const selectOperator = React.useCallback((condition: StepConditions, value): void => {
    if (condition.id && condition.operator) {
      condition.operator.onChange(value);
      condition.factor && condition.factor.onChangeValue(undefined);
      setCurrentConditionId('');
      setCurrentField('');
    }
  }, []);

  return (
    <S.Condition className='ds-conditions'>
      {steps.map((step, index) => {
        return (
          <S.Step key={step.id} withStepName={Boolean(step.stepName)}>
            {step.stepName && (
              <S.StepName>
                {`${index + 1}.`}{' '}
                <InlineEdit
                  size="small"
                  input={{
                    value: step.stepName,
                    name: `condition-step-name-${step.id}`,
                    placeholder: texts.stepNamePlaceholder,
                    onChange: (event: ChangeEvent<HTMLInputElement>): void =>
                      updateStepName && updateStepName(step.id, event.target.value),
                  }}
                />
              </S.StepName>
            )}
            <S.StepConditions>
              <S.Subject>
                <Subject {...step.subject} selectItem={(value): void => selectSubject(value, step)} />
              </S.Subject>
              <S.ConditionRows>
                {step.conditions &&
                  step.conditions.map((condition, conditionIndex) => (
                    <S.ConditionRow key={`condition-row-${condition.id}`}>
                      <S.ConditionConnections
                        first={conditionIndex === 0}
                        last={conditionIndex + 1 === step.conditions.length && !addCondition}
                      />
                      <S.CondtionWrapper>
                        {condition.parameter && (
                          <Factors
                            {...condition.parameter}
                            onChangeValue={(value): void => selectParameter(condition, value)}
                            opened={condition.id === currentConditionId && currentField === 'parameter'}
                          />
                        )}
                      </S.CondtionWrapper>
                      <S.CondtionWrapper>
                        {condition.operator && (
                          <Operators
                            {...condition.operator}
                            onChange={(value): void => selectOperator(condition, value)}
                            opened={condition.id === currentConditionId && currentField === 'operator'}
                          />
                        )}
                      </S.CondtionWrapper>
                      <S.CondtionWrapper>{condition.factor && <Factors {...condition.factor} />}</S.CondtionWrapper>
                      {removeCondition && step.conditions.length > 1 && (
                        <S.RemoveIconWrapper onClick={(): void => removeCondition(step.id, condition.id)} className='ds-conditions-remove-row'>
                          <Tooltip title={texts.removeConditionRowTooltip} trigger={['hover']}>
                            <Icon component={<CloseS />} color={theme.palette['red-600']} />
                          </Tooltip>
                        </S.RemoveIconWrapper>
                      )}
                    </S.ConditionRow>
                  ))}
                {addCondition && (
                  <S.AddConditionRow>
                    <S.ConditionConnections last first={step.conditions.length === 0} />
                    <Button type="ghost" mode="icon-label" onClick={(): void => addCondition(step.id)}>
                      <Icon component={<Add2M />} />
                      {texts.addConditionRowButton}
                    </Button>
                  </S.AddConditionRow>
                )}
              </S.ConditionRows>
            </S.StepConditions>
          </S.Step>
        );
      })}
    </S.Condition>
  );
};
export default Condition;
