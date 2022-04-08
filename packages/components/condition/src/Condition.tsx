import * as React from 'react';
import { useIntl } from 'react-intl';
import { ReactSortable } from 'react-sortablejs';

import Icon, { Add3M } from '@synerise/ds-icon';

import Button from '@synerise/ds-button';
import { NOOP } from '@synerise/ds-utils';
import usePrevious from '@synerise/ds-utils/dist/usePrevious/usePrevious';

import * as T from './Condition.types';
import { ConditionStep } from './ConditionStep';
import * as S from './Condition.style';

const DEFAULT_FIELD = '';
const DEFAULT_CONDITION = '';
const DEFAULT_STEP = '';
export const OPERATOR = 'operator';
export const PARAMETER = 'parameter';
export const FACTOR = 'factor';
export const SUBJECT = 'subject';
const SORTABLE_CONFIG = {
  ghostClass: 'steps-list-ghost-element',
  className: 'steps-list',
  handle: '.step-drag-handler',
  filter: '.ds-condition-step-name, .ds-cruds',
  animation: 150,
  forceFallback: true,
};

const Condition: React.FC<T.ConditionProps> = props => {
  const {
    steps,
    addCondition,
    removeCondition,
    texts,
    duplicateStep,
    removeStep,
    addStep,
    onChangeOrder,
    minConditionsLength = 1,
    maxConditionsLength,
    autoClearCondition,
    onChangeContext,
    onChangeSubject,
    onChangeParameter,
    onChangeOperator,
    onChangeFactorType,
    onChangeFactorValue,
    onUpdateStepName,
    getPopupContainerOverride,
  } = props;
  const { formatMessage } = useIntl();
  const text = React.useMemo(
    () => ({
      addStep: formatMessage({ id: 'DS.CONDITION.ADD-STEP', defaultMessage: 'and then...' }),
      ...texts,
    }),
    [texts, formatMessage]
  );
  const [currentConditionId, setCurrentConditionId] = React.useState<React.ReactText>(DEFAULT_CONDITION);
  const [currentStepId, setCurrentStepId] = React.useState<React.ReactText>(DEFAULT_STEP);
  const [currentField, setCurrentField] = React.useState<string>(DEFAULT_FIELD);
  const prevSteps = usePrevious(steps);

  React.useEffect(() => {
    const newConditionId =
      prevSteps &&
      steps &&
      steps.reduce((id: string | number | undefined, step: T.ConditionStep) => {
        let result = id;
        const conditions = step.conditions.map((condition: T.StepConditions) => ({
          id: condition.id,
          value: condition.parameter?.value,
        }));
        const oldStep = prevSteps.find((prevStep: T.ConditionStep) => prevStep.id === step.id);
        if (oldStep) {
          const oldConditions = oldStep.conditions.map((condition: T.StepConditions) => condition.id);
          const newCondition = conditions.find(condition => oldConditions.indexOf(condition.id) === -1);
          result = newCondition && !newCondition.value ? newCondition.id : result;
        } else {
          result = step.conditions[0]?.id;
        }

        return result;
      }, undefined);
    if (newConditionId && newConditionId !== currentConditionId) {
      setCurrentConditionId(newConditionId);
    }
  }, [currentConditionId, currentField, prevSteps, steps]);

  const clearConditionRow = React.useCallback(
    stepId => {
      const step = steps.find(s => s.id === stepId);
      if (step === undefined || step.conditions.length === 0) return;
      if (removeCondition && addCondition) {
        step.conditions.forEach((condition: T.StepConditions, index: number) => {
          if (index > 0) {
            removeCondition(step.id, condition.id);
          }
        });
      }

      autoClearCondition &&
        step.conditions.forEach((condition: T.StepConditions) => {
          onChangeFactorValue && onChangeFactorValue(step.id, condition.id, undefined);
          onChangeOperator && onChangeOperator(step.id, condition.id, undefined);
          onChangeParameter && onChangeParameter(step.id, condition.id, undefined);
        });
      setCurrentConditionId(step.conditions[0].id);
      setCurrentStepId(step.id);
      if (step.conditions[0].parameter) {
        setCurrentField(PARAMETER);
      } else if (step.conditions[0].operator) {
        setCurrentField(OPERATOR);
      }
    },
    [steps, removeCondition, addCondition, autoClearCondition, onChangeFactorValue, onChangeOperator, onChangeParameter]
  );

  const selectSubject = React.useCallback(
    (value, stepId: React.ReactText): void => {
      clearConditionRow(stepId);
      setCurrentStepId(stepId);
      setCurrentField(PARAMETER);
      onChangeSubject && onChangeSubject(stepId, value);
    },
    [clearConditionRow, onChangeSubject]
  );

  const selectContext = React.useCallback(
    (value, stepId: React.ReactText): void => {
      clearConditionRow(stepId);
      setCurrentStepId(stepId);
      setCurrentField(PARAMETER);
      onChangeContext && onChangeContext(stepId, value);
    },
    [clearConditionRow, onChangeContext]
  );

  const selectParameter = React.useCallback(
    (stepId: React.ReactText, conditionId: React.ReactText, value): void => {
      if (conditionId && onChangeParameter) {
        autoClearCondition && onChangeOperator && onChangeOperator(stepId, conditionId, undefined);
        autoClearCondition && onChangeFactorValue && onChangeFactorValue(stepId, conditionId, undefined);
        onChangeParameter(stepId, conditionId, value);
        setCurrentConditionId(conditionId);
        setCurrentStepId(stepId);
        setCurrentField(OPERATOR);
      }
    },
    [autoClearCondition, onChangeFactorValue, onChangeOperator, onChangeParameter]
  );

  const selectOperator = React.useCallback(
    (stepId: React.ReactText, conditionId: React.ReactText, value): void => {
      if (conditionId && onChangeOperator) {
        autoClearCondition && onChangeFactorValue && onChangeFactorValue(stepId, conditionId, undefined);
        onChangeOperator(stepId, conditionId, value);
        setCurrentConditionId(conditionId);
        setCurrentStepId(stepId);
        setCurrentField(FACTOR);
      }
    },
    [autoClearCondition, onChangeFactorValue, onChangeOperator]
  );

  const setStepConditionFactorType = React.useCallback(
    (stepId, conditionId, factorType): void => {
      setCurrentConditionId(conditionId);
      setCurrentStepId(stepId);
      setCurrentField(FACTOR);
      onChangeFactorType && onChangeFactorType(stepId, conditionId, factorType);
    },
    [onChangeFactorType]
  );

  const setStepConditionFactorValue = React.useCallback(
    (stepId, conditionId, value) => {
      setCurrentField(DEFAULT_FIELD);
      setCurrentStepId(stepId);
      onChangeFactorValue && onChangeFactorValue(stepId, conditionId, value);
    },
    [onChangeFactorValue]
  );

  const draggableEnabled = React.useMemo(() => onChangeOrder && steps.length > 1, [steps, onChangeOrder]);

  const handleAddStep = React.useCallback(() => {
    const newStepId = addStep ? addStep() : undefined;
    console.log('new step id', newStepId);
    if (newStepId) {
      setCurrentStepId(newStepId);
      setCurrentField(SUBJECT);
    }
  }, [addStep]);

  const handleAddCondtion = React.useCallback(
    stepId => {
      const newConditionId = addCondition ? addCondition(stepId) : undefined;
      if (newConditionId) {
        setCurrentConditionId(newConditionId);
        setCurrentStepId(stepId);
        setCurrentField(PARAMETER);
      }
    },
    [addCondition]
  );

  return React.useMemo(() => {
    return (
      <S.Condition className="ds-conditions" data-popup-container>
        <ReactSortable {...SORTABLE_CONFIG} list={steps} setList={onChangeOrder || NOOP}>
          {steps.map((step, index) => {
            console.log('current state', {
              stepId: step.id,
              currentConditionId,
              currentStepId,
              currentField,
            });
            return (
              <ConditionStep
                key={`step-id-${step.id}`}
                step={step}
                texts={text}
                index={index}
                hasPriority={step.id === currentStepId}
                getPopupContainerOverride={getPopupContainerOverride}
                draggableEnabled={draggableEnabled}
                selectOperator={selectOperator}
                selectParameter={selectParameter}
                selectContext={selectContext}
                selectSubject={selectSubject}
                updateStepName={onUpdateStepName}
                duplicateStep={duplicateStep}
                removeStep={removeStep}
                minConditionsLength={minConditionsLength}
                maxConditionsLength={maxConditionsLength}
                setStepConditionFactorType={setStepConditionFactorType}
                setStepConditionFactorValue={setStepConditionFactorValue}
                currentConditionId={currentConditionId}
                currentStepId={currentStepId}
                currentField={currentField}
                removeCondition={removeCondition}
                addCondition={handleAddCondtion}
                setCurrentField={setCurrentField}
                setCurrentCondition={setCurrentConditionId}
                setCurrentStep={setCurrentStepId}
              />
            );
          })}
        </ReactSortable>
        {addStep && (
          <S.AddStepButton>
            <Button type="ghost" mode="icon-label" onClick={handleAddStep}>
              <Icon component={<Add3M />} />
              {text.addStep}
            </Button>
          </S.AddStepButton>
        )}
      </S.Condition>
    );
  }, [
    steps,
    onChangeOrder,
    addStep,
    handleAddStep,
    text,
    currentConditionId,
    currentStepId,
    currentField,
    getPopupContainerOverride,
    draggableEnabled,
    selectOperator,
    selectParameter,
    selectContext,
    selectSubject,
    onUpdateStepName,
    duplicateStep,
    removeStep,
    minConditionsLength,
    maxConditionsLength,
    setStepConditionFactorType,
    setStepConditionFactorValue,
    removeCondition,
    addCondition,
  ]);
};

export default Condition;
