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
import { ReactSortable } from 'react-sortablejs';
import { useIntl } from 'react-intl';
import usePrevious from '@synerise/ds-utils/dist/usePrevious/usePrevious';
import { ConditionProps, ConditionStep, StepConditions } from './Condition.types';
import * as S from './Condition.style';

const DEFAULT_FIELD = '';
const DEFAULT_CONDITION = '';
const OPERATOR = 'operator';
const PARAMETER = 'parameter';
const FACTOR = 'factor';
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
  minConditionsLength = 1,
}) => {
  const { formatMessage } = useIntl();
  const text = React.useMemo(
    () => ({
      stepNamePlaceholder: formatMessage({ id: 'DS.CONDITION.STEP_NAME-PLACEHOLDER', defaultMessage: 'Step name' }),
      removeConditionRowTooltip: formatMessage({
        id: 'DS.CONDITION.REMOVE-CONDITION-ROW-TOOLTIP',
        defaultMessage: 'Delete',
      }),
      addConditionRowButton: formatMessage({
        id: 'DS.CONDITION.ADD-CONDITION-ROW-BUTTON',
        defaultMessage: 'Add condition',
      }),
      addFirstConditionRowButton: formatMessage({
        id: 'DS.CONDITION.ADD-FIRST-CONDITION-ROW-BUTTON',
        defaultMessage: 'Add condition',
      }),
      addStep: formatMessage({ id: 'DS.CONDITION.ADD-STEP', defaultMessage: 'Add step' }),
      dropLabel: formatMessage({ id: 'DS.CONDITION.DROP-LABEL', defaultMessage: 'Drop me here' }),
      moveTooltip: formatMessage({ id: 'DS.CONDITION.MOVE-TOOLTIP', defaultMessage: 'Move' }),
      duplicateTooltip: formatMessage({ id: 'DS.CONDITION.DUPLICATE-TOOLTIP', defaultMessage: 'Duplicate' }),
      removeTooltip: formatMessage({ id: 'DS.CONDITION.REMOVE-TOOLTIP', defaultMessage: 'Delete' }),
      ...texts,
    }),
    [texts, formatMessage]
  );
  const [currentConditionId, setCurrentConditionId] = React.useState<React.ReactText>(DEFAULT_CONDITION);
  const [currentField, setCurrentField] = React.useState<string>(DEFAULT_FIELD);
  const prevSteps = usePrevious(steps);

  React.useEffect(() => {
    const newConditionId =
      prevSteps &&
      steps &&
      steps.reduce((id: string | number | undefined, step: ConditionStep) => {
        let result = id;
        const conditions = step.conditions.map((condition: StepConditions) => condition.id);
        const oldStep = prevSteps.find((prevStep: ConditionStep) => prevStep.id === step.id);
        if (oldStep) {
          const oldConditions = oldStep.conditions.map((condition: StepConditions) => condition.id);
          const newCondition = conditions.find(condId => oldConditions.indexOf(condId) === -1);
          result = newCondition || result;
        } else {
          result = step.conditions[0]?.id;
        }

        return result;
      }, undefined);
    if (newConditionId && newConditionId !== currentConditionId) {
      setCurrentConditionId(newConditionId);
      setCurrentField(PARAMETER);
    }
  }, [currentConditionId, prevSteps, steps]);

  const clearConditionRow = React.useCallback(
    step => {
      if (step.conditions.length === 0) return;
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
        setCurrentField(PARAMETER);
      } else if (step.conditions[0].operator) {
        setCurrentField(OPERATOR);
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
      setCurrentField(OPERATOR);
    }
  }, []);

  const selectOperator = React.useCallback((condition: StepConditions, value): void => {
    if (condition.id && condition.operator) {
      condition.factor && condition.factor.onChangeValue(undefined);
      condition.operator.onChange(value);
      setCurrentConditionId(condition.id);
      setCurrentField(FACTOR);
    }
  }, []);

  const setStepConditionFactorType = React.useCallback((step, condition, factorType): void => {
    setCurrentConditionId(condition.id);
    setCurrentField(FACTOR);
    condition.factor && condition.factor.setSelectedFactorType(factorType);
  }, []);

  const setStepConditionFactorValue = React.useCallback((step, condition, value) => {
    setCurrentField(DEFAULT_FIELD);
    condition.factor && condition.factor.setSelectedFactorType(value);
  }, []);

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
                    onDuplicate={duplicateStep ? (): void => duplicateStep(step.id) : undefined}
                    onDelete={removeStep ? (): void => removeStep(step.id) : undefined}
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
                  {step.conditions.length > 0 &&
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
                              opened={condition.id === currentConditionId && currentField === PARAMETER}
                            />
                          )}
                        </S.ConditionWrapper>
                        {condition?.parameter?.value && (
                          <S.ConditionWrapper>
                            {condition.operator && (
                              <Operators
                                {...condition.operator}
                                onChange={(value): void => selectOperator(condition, value)}
                                opened={condition.id === currentConditionId && currentField === OPERATOR}
                              />
                            )}
                          </S.ConditionWrapper>
                        )}
                        {condition?.operator?.value && (
                          <S.ConditionWrapper>
                            {condition.factor && (
                              <Factors
                                {...condition.factor}
                                setSelectedFactorType={(factorType): void =>
                                  setStepConditionFactorType(step, condition, factorType)
                                }
                                onChangeValue={(value): void => setStepConditionFactorValue(step, condition, value)}
                                factorKey={condition.id}
                                opened={condition.id === currentConditionId && currentField === FACTOR}
                              />
                            )}
                          </S.ConditionWrapper>
                        )}
                        {removeCondition && step.conditions.length > minConditionsLength && (
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
                      <Button
                        type="ghost"
                        mode="icon-label"
                        onClick={(): void => {
                          addCondition(step.id);
                        }}
                        disabled={!(Boolean(step.subject?.selectedItem) || Boolean(step.context?.selectedItem))}
                      >
                        <Icon component={<Add2M />} />
                        {step.conditions.length > 0 ? text.addConditionRowButton : text.addFirstConditionRowButton}
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
