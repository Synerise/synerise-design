import * as React from 'react';
import InlineEdit from '@synerise/ds-inline-edit';
import { Add2M, CloseS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './Condition.style';
import { ConditionProps } from './Condition.types';

const Condition: React.FC<ConditionProps> = ({ steps, addCondition, removeCondition, updateStepName }) => {
  return (
    <S.Condition>
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
                    name: 'condition-step-name',
                    placeholder: 'Step name',
                    onChange: (event): void => updateStepName && updateStepName(step.id, event.target.value),
                  }}
                />
              </S.StepName>
            )}
            <S.StepConditions>
              <S.Subject>{step.subject}</S.Subject>
              <S.ConditionRows>
                {step.conditions &&
                  step.conditions.map((condition, conditionIndex) => (
                    <S.ConditionRow key={`condition-row-${condition.id}`}>
                      <S.ConditionConnections
                        first={conditionIndex === 0}
                        last={conditionIndex + 1 === step.conditions.length && !addCondition}
                      />
                      <S.CondtionWrapper>{condition.parameter}</S.CondtionWrapper>
                      <S.CondtionWrapper>{condition.operator}</S.CondtionWrapper>
                      <S.CondtionWrapper>{condition.factor}</S.CondtionWrapper>
                      {removeCondition && (
                        <S.RemoveIconWrapper onClick={(): void => removeCondition(step.id, condition.id)}>
                          <Tooltip title="Remove" trigger={['hover']}>
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
                      and where
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
