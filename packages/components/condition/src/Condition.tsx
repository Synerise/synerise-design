import * as React from 'react';
import InlineEdit from '@synerise/ds-inline-edit';
import { Add2M, Add3M, CloseS, DragHandleM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
import { ChangeEvent } from 'react';
import Subject from '@synerise/ds-subject';
import Factors from '@synerise/ds-factors';
import Operators from '@synerise/ds-operators';
import ContextSelector from '@synerise/ds-context-selector';
import Cruds from '@synerise/ds-cruds';
import { ReactSortable } from 'react-sortablejs-typescript';
import { useIntl } from 'react-intl';
import { ConditionProps, ConditionStep, StepConditions } from './Condition.types';
import * as S from './Condition.style';

const DEFAULT_FIELD = '';
const DEFAULT_CONDITION = '';
// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};
const SORTABLE_CONFIG = {
  ghostClass: 'steps-list-ghost-element',
  className: 'steps-list',
  handle: '.step-drag-handler',
  animation: 150,
  forceFallback: true,
};

const Condition: React.FC<ConditionProps> = ({
  steps,
  addCondition,
  removeCondition,
  updateStepName,
  texts,
  duplicateStep,
  removeStep,
  addStep,
  onChangeOrder,
}) => {
  const { formatMessage } = useIntl();
  const text = React.useMemo(
    () => ({
      stepNamePlaceholder: formatMessage({ id: 'DS.CONDTION.STEP_NAME-PLACEHOLDER' }),
      removeConditionRowTooltip: formatMessage({ id: 'DS.CONDTION.REMOVE-CONDITION-ROW-TOOLTIP' }),
      addConditionRowButton: formatMessage({ id: 'DS.CONDTION.ADD-CONDITION-ROW-BUTTON' }),
      addStep: formatMessage({ id: 'DS.CONDTION.ADD-STEP' }),
      dropLabel: formatMessage({ id: 'DS.CONDTION.DROP-LABEL' }),
      moveTooltip: formatMessage({ id: 'DS.CONDTION.MOVE-TOOLTIP' }),
      duplicateTooltip: formatMessage({ id: 'DS.CONDTION.DUPLICATE-TOOLTIP' }),
      removeTooltip: formatMessage({ id: 'DS.CONDTION.REMOVE-TOOLTIP' }),
    }),
    [texts, formatMessage]
  );
  const [currentConditionId, setCurrentConditionId] = React.useState<React.ReactText>(DEFAULT_CONDITION);
  const [currentField, setCurrentField] = React.useState<string>(DEFAULT_FIELD);

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
      setCurrentConditionId(step.conditions[0].id);
      if (step.conditions[0].parameter) {
        setCurrentField('parameter');
      } else if (step.conditions[0].operator) {
        setCurrentField('operator');
      }
    },
    [removeCondition, addCondition]
  );

  const selectSubject = React.useCallback(
    (value, step: ConditionStep): void => {
      clearConditionRow(step);
      step.subject && step.subject.onSelectItem(value);
    },
    [clearConditionRow]
  );

  const selectContext = React.useCallback(
    (value, step: ConditionStep): void => {
      clearConditionRow(step);
      step.context && step.context.onSelectItem(value);
    },
    [clearConditionRow]
  );

  const selectParameter = React.useCallback((condition: StepConditions, value): void => {
    if (condition.id && condition.parameter) {
      condition.operator && condition.operator.onChange(undefined);
      condition.factor && condition.factor.onChangeValue(undefined);
      condition.parameter.onChangeValue(value);
      setCurrentConditionId(condition.id);
      setCurrentField('operator');
    }
  }, []);

  const selectOperator = React.useCallback((condition: StepConditions, value): void => {
    if (condition.id && condition.operator) {
      condition.factor && condition.factor.onChangeValue(undefined);
      condition.operator.onChange(value);
      setCurrentConditionId(DEFAULT_CONDITION);
      setCurrentField(DEFAULT_FIELD);
    }
  }, []);

  React.useEffect(() => {
    if (currentField !== DEFAULT_FIELD) {
      setCurrentField(DEFAULT_FIELD);
    }
  }, [currentField, setCurrentField]);

  const draggableEnabled = React.useMemo(() => onChangeOrder && steps.length > 1, [steps, onChangeOrder]);

  return (
    <S.Condition className="ds-conditions">
      <ReactSortable {...SORTABLE_CONFIG} list={steps} setList={onChangeOrder || NOOP}>
        {steps.map((step, index) => {
          return (
            <S.Step key={step.id} withStepName={step.stepName !== undefined} data-dropLabel={text.dropLabel}>
              <S.StepHeader>
                {step.stepName !== undefined && (
                  <S.StepName>
                    {`${index + 1}.`}{' '}
                    <InlineEdit
                      size="small"
                      input={{
                        value: step.stepName,
                        name: `condition-step-name-${step.id}`,
                        placeholder: text.stepNamePlaceholder,
                        onChange: (event: ChangeEvent<HTMLInputElement>): void =>
                          updateStepName && updateStepName(step.id, event.target.value),
                      }}
                    />
                  </S.StepName>
                )}
                <S.StepCruds>
                  {draggableEnabled && (
                    <Cruds.CustomAction
                      icon={<DragHandleM />}
                      title={text.moveTooltip}
                      onClick={NOOP}
                      className="step-drag-handler"
                    />
                  )}
                  <Cruds
                    onDuplicate={(): void => duplicateStep(step.id)}
                    onDelete={(): void => removeStep(step.id)}
                    duplicateTooltip={text.duplicateTooltip}
                    deleteTooltip={text.removeTooltip}
                  />
                </S.StepCruds>
              </S.StepHeader>
              <S.StepConditions>
                <S.Subject>
                  {step.subject && (
                    <Subject {...step.subject} onSelectItem={(value): void => selectSubject(value, step)} />
                  )}
                  {step.context && (
                    <ContextSelector {...step.context} onSelectItem={(value): void => selectContext(value, step)} />
                  )}
                </S.Subject>
                <S.ConditionRows>
                  {step.conditions &&
                    step.conditions.map((condition, conditionIndex) => (
                      <S.ConditionRow key={`condition-row-${condition.id}`}>
                        <S.ConditionConnections
                          first={conditionIndex === 0}
                          last={conditionIndex + 1 === step.conditions.length && !addCondition}
                        />
                        <S.ConditionWrapper>
                          {condition.parameter && (
                            <Factors
                              {...condition.parameter}
                              onChangeValue={(value): void => selectParameter(condition, value)}
                              opened={condition.id === currentConditionId && currentField === 'parameter'}
                            />
                          )}
                        </S.ConditionWrapper>
                        <S.ConditionWrapper>
                          {condition.operator && (
                            <Operators
                              {...condition.operator}
                              onChange={(value): void => selectOperator(condition, value)}
                              opened={condition.id === currentConditionId && currentField === 'operator'}
                            />
                          )}
                        </S.ConditionWrapper>
                        <S.ConditionWrapper>{condition.factor && <Factors {...condition.factor} />}</S.ConditionWrapper>
                        {removeCondition && step.conditions.length > 1 && (
                          <S.RemoveIconWrapper
                            onClick={(): void => removeCondition(step.id, condition.id)}
                            className="ds-conditions-remove-row"
                          >
                            <Tooltip title={text.removeConditionRowTooltip} trigger={['hover']}>
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
                        {text.addConditionRowButton}
                      </Button>
                    </S.AddConditionRow>
                  )}
                </S.ConditionRows>
              </S.StepConditions>
            </S.Step>
          );
        })}
      </ReactSortable>
      {addStep && (
        <Button type="ghost-primary" mode="icon-label" onClick={addStep}>
          <Icon component={<Add3M />} />
          {text.addStep}
        </Button>
      )}
    </S.Condition>
  );
};
export default Condition;
